/**
 * CookieConsent Configuration for CanHost
 * Implements Google Consent Mode v2
 * Note: Consent defaults are set in head.html before GTM loads
 */

/**
 * Update Google Consent based on user choices
 */
function updateGtagConsent() {
    gtag('consent', 'update', {
        'analytics_storage': CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
        'ad_storage': CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
        'ad_user_data': CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
        'ad_personalization': CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
        'functionality_storage': CookieConsent.acceptedCategory('functionality') ? 'granted' : 'denied',
        'personalization_storage': CookieConsent.acceptedCategory('functionality') ? 'granted' : 'denied'
    });
}

// Initialise CookieConsent
CookieConsent.run({

    // GDPR requires opt-in
    mode: 'opt-in',

    // Auto-show the banner
    autoShow: true,

    // Don't block page interaction
    disablePageInteraction: false,

    // Hide from bots
    hideFromBots: true,

    // Cookie settings
    cookie: {
        name: 'cc_canhost',
        domain: window.location.hostname,
        path: '/',
        secure: true,
        expiresAfterDays: 182,
        sameSite: 'Lax'
    },

    // UI options
    guiOptions: {
        consentModal: {
            layout: 'box',
            position: 'bottom left',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    // Categories
    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {
            enabled: false,
            autoClear: {
                cookies: [
                    { name: /^_ga/ },
                    { name: '_gid' }
                ]
            }
        },
        marketing: {
            enabled: false,
            autoClear: {
                cookies: [
                    { name: /^_gcl/ },
                    { name: '_fbp' }
                ]
            }
        },
        functionality: {
            enabled: false
        }
    },

    // Language and translations
    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'We use cookies to improve your experience on our site and to analyse our traffic. You can choose which cookies you allow.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage preferences',
                    footer: '<a href="/privacy">Privacy Policy</a>'
                },
                preferencesModal: {
                    title: 'Cookie Preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Save preferences',
                    closeIconLabel: 'Close',
                    sections: [
                        {
                            title: 'Cookie Usage',
                            description: 'We use cookies to ensure the basic functionality of our website and to enhance your online experience. You can choose to opt in or out of each category whenever you want.'
                        },
                        {
                            title: 'Strictly Necessary Cookies',
                            description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analytics Cookies',
                            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
                            linkedCategory: 'analytics',
                            cookieTable: {
                                headers: {
                                    name: 'Name',
                                    domain: 'Service',
                                    description: 'Description',
                                    expiration: 'Expiration'
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: 'Google Analytics',
                                        description: 'Used to distinguish users',
                                        expiration: '2 years'
                                    },
                                    {
                                        name: '_gid',
                                        domain: 'Google Analytics',
                                        description: 'Used to distinguish users',
                                        expiration: '24 hours'
                                    }
                                ]
                            }
                        },
                        {
                            title: 'Marketing Cookies',
                            description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
                            linkedCategory: 'marketing'
                        },
                        {
                            title: 'Functionality Cookies',
                            description: 'These cookies enable enhanced functionality and personalisation.',
                            linkedCategory: 'functionality'
                        },
                        {
                            title: 'More Information',
                            description: 'For any queries about our cookie policy, please <a href="mailto:support@canhost.co.uk">contact us</a>.'
                        }
                    ]
                }
            }
        }
    },

    // Callbacks
    onFirstConsent: function() {
        updateGtagConsent();
    },

    onConsent: function() {
        updateGtagConsent();
    },

    onChange: function() {
        updateGtagConsent();
    }
});
