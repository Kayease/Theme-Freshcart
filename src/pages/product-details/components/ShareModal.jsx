import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareModal = ({ isOpen, onClose, product, url }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `Check out this ${product.name} on FreshCart`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'Email',
      icon: 'Mail',
      url: `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch (error) {
      console.log('Clipboard API failed:', error);
    }

    // Fallback method
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShareClick = (shareUrl) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-heading-bold text-text-primary">
            Share Product
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-text-secondary mb-2">
            Share "{product.name}" with others
          </p>
        </div>

        {/* Social Media Share Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShareClick(option.url)}
              className={`${option.color} text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
            >
              <Icon name={option.icon} size={20} />
              <span className="text-sm font-medium">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link Section */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-gray-50"
            />
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className={copied ? 'bg-green-100 text-green-700 border-green-300' : ''}
            >
              {copied ? (
                <>
                  <Icon name="Check" size={16} className="mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Icon name="Copy" size={16} className="mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
