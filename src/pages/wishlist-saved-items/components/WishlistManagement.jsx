import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WishlistManagement = ({ 
  wishlists, 
  selectedWishlist, 
  onSelectWishlist, 
  onCreateWishlist, 
  onDeleteWishlist, 
  onRenameWishlist,
  onShareWishlist 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [editingWishlist, setEditingWishlist] = useState(null);
  const [newWishlistName, setNewWishlistName] = useState('');
  const [newWishlistPrivate, setNewWishlistPrivate] = useState(false);
  const [editName, setEditName] = useState('');

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      onCreateWishlist(newWishlistName.trim(), newWishlistPrivate);
      setNewWishlistName('');
      setNewWishlistPrivate(false);
      setShowCreateForm(false);
    }
  };

  const handleRenameWishlist = (wishlistId) => {
    if (editName.trim()) {
      onRenameWishlist(wishlistId, editName.trim());
      setEditingWishlist(null);
      setEditName('');
    }
  };

  const startEditing = (wishlist) => {
    setEditingWishlist(wishlist.id);
    setEditName(wishlist.name);
    setShowActions(null);
  };

  const handleShare = (wishlistId) => {
    onShareWishlist(wishlistId);
    setShowActions(null);
  };

  const handleDelete = (wishlistId) => {
    if (window.confirm('Are you sure you want to delete this wishlist?')) {
      onDeleteWishlist(wishlistId);
      setShowActions(null);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-heading-bold text-xl text-text-primary">
          My Wishlists
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Create New
        </Button>
      </div>

      {/* Create Wishlist Form */}
      {showCreateForm && (
        <div className="bg-border-light rounded-card p-4 mb-4">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Wishlist name"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNewWishlistPrivate(!newWishlistPrivate)}
                className={`w-5 h-5 border-2 border-border rounded ${
                  newWishlistPrivate ? 'bg-primary border-primary' : 'hover:border-primary'
                } transition-colors`}
              >
                {newWishlistPrivate && (
                  <Icon name="Check" size={12} className="text-white" />
                )}
              </button>
              <label className="text-sm text-text-secondary cursor-pointer">
                Make this wishlist private
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onClick={handleCreateWishlist}
                disabled={!newWishlistName.trim()}
              >
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewWishlistName('');
                  setNewWishlistPrivate(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Tabs */}
      <div className="flex flex-wrap gap-2">
        {wishlists.map((wishlist) => (
          <div key={wishlist.id} className="relative">
            <button
              onClick={() => onSelectWishlist(wishlist.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-button transition-colors ${
                selectedWishlist === wishlist.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-border-light text-text-primary hover:bg-border'
              }`}
            >
              {editingWishlist === wishlist.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-32 h-6 text-sm"
                    autoFocus
                    onBlur={() => handleRenameWishlist(wishlist.id)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleRenameWishlist(wishlist.id);
                      }
                    }}
                  />
                </div>
              ) : (
                <>
                  <Icon name="Heart" size={16} />
                  <span className="font-caption">{wishlist.name}</span>
                  <span className="text-xs opacity-75">({wishlist.itemCount})</span>
                  {wishlist.isPrivate && (
                    <Icon name="Lock" size={12} className="opacity-75" />
                  )}
                </>
              )}
            </button>

            {/* Actions Dropdown */}
            {selectedWishlist === wishlist.id && editingWishlist !== wishlist.id && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <button
                  onClick={() => setShowActions(showActions === wishlist.id ? null : wishlist.id)}
                  className="w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon name="MoreHorizontal" size={12} />
                </button>

                {showActions === wishlist.id && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-card shadow-modal z-dropdown">
                    <div className="py-2">
                      <button
                        onClick={() => startEditing(wishlist)}
                        className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-border-light transition-colors"
                      >
                        <Icon name="Edit" size={14} className="mr-2" />
                        Rename
                      </button>
                      <button
                        onClick={() => handleShare(wishlist.id)}
                        className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-border-light transition-colors"
                      >
                        <Icon name="Share" size={14} className="mr-2" />
                        Share
                      </button>
                      {wishlists.length > 1 && (
                        <button
                          onClick={() => handleDelete(wishlist.id)}
                          className="flex items-center w-full px-3 py-2 text-sm text-error hover:bg-error hover:text-error-foreground transition-colors"
                        >
                          <Icon name="Trash2" size={14} className="mr-2" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistManagement;