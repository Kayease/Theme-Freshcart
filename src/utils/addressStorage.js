// Local storage helpers for delivery addresses

const ADDRESS_KEYS = {
  addresses: 'deliveryAddresses',
};

export function getStoredAddresses() {
  try {
    const raw = localStorage.getItem(ADDRESS_KEYS.addresses);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setStoredAddresses(addresses) {
  try {
    localStorage.setItem(ADDRESS_KEYS.addresses, JSON.stringify(addresses));
    return true;
  } catch (e) {
    return false;
  }
}

export function addStoredAddress(address) {
  try {
    const addresses = getStoredAddresses();
    const newAddress = {
      ...address,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedAddresses = [...addresses, newAddress];
    setStoredAddresses(updatedAddresses);
    return newAddress;
  } catch (e) {
    return null;
  }
}

export function updateStoredAddress(addressId, updates) {
  try {
    const addresses = getStoredAddresses();
    const updatedAddresses = addresses.map(addr => 
      addr.id === addressId 
        ? { ...addr, ...updates, updatedAt: new Date().toISOString() }
        : addr
    );
    setStoredAddresses(updatedAddresses);
    return updatedAddresses.find(addr => addr.id === addressId);
  } catch (e) {
    return null;
  }
}

export function deleteStoredAddress(addressId) {
  try {
    const addresses = getStoredAddresses();
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setStoredAddresses(updatedAddresses);
    return true;
  } catch (e) {
    return false;
  }
}

export function setDefaultAddress(addressId) {
  try {
    const addresses = getStoredAddresses();
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
      updatedAt: new Date().toISOString()
    }));
    setStoredAddresses(updatedAddresses);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  getStoredAddresses,
  setStoredAddresses,
  addStoredAddress,
  updateStoredAddress,
  deleteStoredAddress,
  setDefaultAddress,
};
