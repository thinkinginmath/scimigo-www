import React, { useState, useEffect } from 'react';

interface RateLimitModalProps {
  open: boolean;
  onClose: () => void;
  userTier?: string;
  usageInfo?: {
    calls_used?: number;
    daily_limit?: number;
    calls_remaining?: number;
    tokens_used?: number;
    token_limit?: number;
    tokens_remaining?: number;
    reset_time?: string;
    reason?: string;
  };
  message?: string;
}

interface PricingInfo {
  plans?: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    limits: {
      calls: string;
      features: string[];
    };
    icon: string;
    popular?: boolean;
  }>;
  waitlistUrl?: string;
  message?: string;
}

const RateLimitModal: React.FC<RateLimitModalProps> = ({ 
  open, 
  onClose, 
  userTier = 'free',
  usageInfo = {},
  message = 'Too many requests'
}) => {
  const [dynamicPricing, setDynamicPricing] = useState<PricingInfo | null>(null);
  const [isLoadingPricing, setIsLoadingPricing] = useState(false);
  
  // Default pricing info
  const DEFAULT_WAITLIST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSepQhW6rNKrSYyomEcc-_GbD96mHY59bY3BnNZgCLbsuLzXfg/viewform';
  const PRICING_INFO_URL = 'https://app.scimigo.com/pricing-info.json'; // URL to fetch dynamic pricing
  
  useEffect(() => {
    if (open && !dynamicPricing && !isLoadingPricing) {
      // Try to fetch dynamic pricing info
      setIsLoadingPricing(true);
      fetch(PRICING_INFO_URL)
        .then(res => res.json())
        .then(data => {
          setDynamicPricing(data);
          setIsLoadingPricing(false);
        })
        .catch(err => {
          console.log('Failed to fetch dynamic pricing, using defaults');
          setIsLoadingPricing(false);
        });
    }
  }, [open, dynamicPricing, isLoadingPricing]);
  
  if (!open) return null;

  const isFreeUser = userTier === 'free' || userTier === 'FREE';
  const waitlistUrl = dynamicPricing?.waitlistUrl || DEFAULT_WAITLIST_URL;
  
  const formatResetTime = (resetTime?: string) => {
    if (!resetTime) return 'tomorrow';
    try {
      const resetDate = new Date(resetTime);
      const now = new Date();
      const diffHours = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60 * 60));
      
      if (diffHours <= 1) return 'in about an hour';
      if (diffHours <= 24) return `in ${diffHours} hours`;
      return 'tomorrow';
    } catch {
      return 'tomorrow';
    }
  };

  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Open the waitlist form for expressing interest in paid services
    chrome.tabs.create({
      url: waitlistUrl
    });
  };
  
  // Use dynamic plans if available, otherwise use defaults
  const plans = dynamicPricing?.plans || [
    {
      name: 'Student',
      price: '$19.99',
      period: '/month',
      description: 'Perfect for regular homework help',
      limits: {
        calls: '5 problems/day, 100/month',
        features: ['All solving modes', 'Conversation history', 'Priority support']
      },
      icon: '📚',
      popular: true,
    },
    {
      name: 'Pro',
      price: '$39.99',
      period: '/month',
      description: 'For heavy users and advanced coursework',
      limits: {
        calls: '10 problems/day, 200/month',
        features: ['Everything in Student', 'Advanced plotting', 'Early access features']
      },
      icon: '⚡',
      popular: false,
    }
  ];
  
  const upgradeMessage = dynamicPricing?.message || 
    'Paid plans are coming soon! Join the waitlist to be notified when Student and Pro plans launch with more daily problems and premium features.';

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="rate-limit-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rate-limit-modal-container" onClick={handleModalClick}>
        <div className="rate-limit-modal-header">
          <div className="rate-limit-modal-brand">
            <div className="rate-limit-modal-icon">⚠️</div>
            <div>
              <h2 className="rate-limit-modal-title">Rate Limit Reached</h2>
              <p className="rate-limit-modal-subtitle">{message}</p>
            </div>
          </div>
          <button
            onClick={handleCloseClick}
            className="rate-limit-modal-close"
          >
            ×
          </button>
        </div>

        <div className="rate-limit-modal-content">
          {/* Current usage info */}
          <div className="rate-limit-modal-usage">
            <h4 className="rate-limit-modal-usage-title">Usage Details</h4>
            <div className="rate-limit-modal-usage-grid">
              <div className="rate-limit-modal-usage-item">
                <span className="rate-limit-modal-usage-label">Problems solved today:</span>
                <span className="rate-limit-modal-usage-value">{usageInfo.calls_used || 0}</span>
              </div>
              <div className="rate-limit-modal-usage-item">
                <span className="rate-limit-modal-usage-label">Daily limit:</span>
                <span className="rate-limit-modal-usage-value">{usageInfo.daily_limit || 0}</span>
              </div>
              <div className="rate-limit-modal-usage-item rate-limit-modal-usage-full">
                <span className="rate-limit-modal-usage-label">Resets:</span>
                <span className="rate-limit-modal-usage-value">{formatResetTime(usageInfo.reset_time)}</span>
              </div>
            </div>
          </div>

          {/* Free user upgrade message */}
          {isFreeUser && (
            <div className="rate-limit-modal-upgrade">
              <h4 className="rate-limit-modal-upgrade-title">
                Need more help with your studies?
              </h4>
              <p className="rate-limit-modal-upgrade-description">
                {upgradeMessage}
              </p>
              
              {/* Plan comparison */}
              <div className="rate-limit-modal-plans">
                {plans.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`rate-limit-modal-plan ${plan.popular ? 'rate-limit-modal-plan-recommended' : ''}`}
                  >
                    {plan.popular && (
                      <div className="rate-limit-modal-plan-badge">Recommended</div>
                    )}
                    <div className="rate-limit-modal-plan-header">
                      <div className="rate-limit-modal-plan-icon">{plan.icon}</div>
                      <h5 className="rate-limit-modal-plan-name">{plan.name}</h5>
                    </div>
                    <div className="rate-limit-modal-plan-price">
                      <span className="rate-limit-modal-plan-amount">{plan.price}</span>
                      <span className="rate-limit-modal-plan-period">{plan.period}</span>
                    </div>
                    <p className="rate-limit-modal-plan-description">{plan.description}</p>
                    <div className="rate-limit-modal-plan-features">
                      <div className="rate-limit-modal-plan-feature">{plan.limits.calls}</div>
                      {plan.limits.features.map((feature, idx) => (
                        <div key={idx} className="rate-limit-modal-plan-feature">• {feature}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing paid user message */}
          {!isFreeUser && (
            <div className="rate-limit-modal-paid-user">
              <h4 className="rate-limit-modal-paid-user-title">
                You've reached your daily limit
              </h4>
              <p className="rate-limit-modal-paid-user-description">
                {userTier === 'basic' || userTier === 'BASIC' || userTier === 'student' || userTier === 'STUDENT' ? (
                  <>
                    Consider upgrading to Pro for 2x more daily problems (10/day, 200/month), or wait until your limit resets {formatResetTime(usageInfo.reset_time)}.
                  </>
                ) : (
                  <>
                    Your limit will reset {formatResetTime(usageInfo.reset_time)}. Thank you for being a Pro member!
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="rate-limit-modal-footer">
          <button
            onClick={handleCloseClick}
            className="rate-limit-modal-button-secondary"
          >
            Close
          </button>
          
          {isFreeUser && (
            <button
              onClick={handleJoinWaitlist}
              className="rate-limit-modal-button-primary"
            >
              👥 Join Waitlist
            </button>
          )}
          
          {(userTier === 'basic' || userTier === 'BASIC' || userTier === 'student' || userTier === 'STUDENT') && (
            <button
              onClick={handleJoinWaitlist}
              className="rate-limit-modal-button-primary"
            >
              ⚡ Join Pro Waitlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateLimitModal;