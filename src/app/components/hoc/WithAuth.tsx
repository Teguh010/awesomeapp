import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

import { getFromLocalStorage } from '@/lib/helpers';

import useAuthStore from '@/store/useAuthStore';

import PageLoader from '@/app/components/molecules/PageLoader';
import { getProfileService } from '@/services/get-profile-service';

import { User } from '@/types/user';

const HOME_ROUTE = '/home';
const LOGIN_ROUTE = '/';

enum RouteRole {
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  required,
  /**
   * For authentication pages
   * @example /login /register
   */
  without,
}

export interface WithAuthProps {
  user: User;
}

export default function WithAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const params = useSearchParams();
    const redirect = params.get('redirect');
    const pathName = usePathname();

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    const checkAuth = React.useCallback(() => {
      const token = getFromLocalStorage('access_token');

      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          const res = await getProfileService();
          if (!res.data.data) {
            throw new Error(res.data.message);
          }
          login({
            ...res.data.data,
          });
        } catch (err) {
          toast.error((err as Error).message);
          logout();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);

    React.useEffect(() => {
      // run checkAuth every page visit
      checkAuth();

      // run checkAuth every focus changes
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (routeRole === 'without') {
            if (redirect) {
              router.replace(redirect as string);
            } else {
              router.replace(HOME_ROUTE);
            }
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routeRole == 'required') {
            router.replace(`${LOGIN_ROUTE}?redirect=${pathName}`);
          }
        }
      }
    }, [isAuthenticated, isLoading, redirect, router, user, pathName]);

    if (
      // If unauthenticated user want to access protected pages
      (isLoading || !isAuthenticated) &&
      // auth pages and optional pages are allowed to access without login
      routeRole !== 'without'
    ) {
      return (
        <>
          <PageLoader />
        </>
      );
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
