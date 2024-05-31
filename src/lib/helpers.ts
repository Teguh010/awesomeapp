export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function setToLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}

export function removeFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
}

export function getLocalProfileFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const temp = window.localStorage.getItem('profile') ?? '';
    if (temp != '') {
      return JSON.parse(temp);
    }
  }
  return null;
}

export function setLocalProfileToLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    const temp = window.localStorage.getItem('profile') ?? '';
    let localProfile: { [k in string]: string } = {};
    if (temp != '') {
      localProfile = JSON.parse(temp);
    }
    localProfile[key] = value;
    window.localStorage.setItem('profile', JSON.stringify(localProfile));
    const event = new Event('localStorageUpdate');
    window.dispatchEvent(event);
  }
}

export function extractANumberAndAUnit(input: string) {
  const regex = /(\d+)\s*(\D+)/;
  const matches = input.match(regex);

  if (matches) {
    const value = matches[1]; // "160"
    const unit = matches[2].trim(); // "cm" (or other unit, without trailing spaces)

    return {
      value: value,
      unit: unit,
    };
  } else {
    return null;
  }
}

export function calculateAge(birthday: string): number {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day} / ${month} / ${year}`;
}

