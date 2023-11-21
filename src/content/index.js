const DOMAINS = {
    'yahoo.com': [
        /.*\.yahoo\.com/,
    ]
};
const PARSERS = {
    'yahoo.com': [
        'div[role=textbox]',
    ],
};
const DEFAULT_PARSERS = [
    'input[type=text]',
    'textarea',
];
const ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAABDZJREFUSEullOtPW2Ucx7/n1tOWnt4CbbmusGEnKwjiWNzlhYJjuCFxugkvfGGI8RJ9ZUyM/gNLfG0MWTTTLU6mSxY3cSyDqWjAKNkYOMqt7SistNAWeuG0Pe05nhK7NAoT6pP8cn45z/n+Ps/v+zzPIZAzLrRaNZxa9TRBYvSFy5PB3Ll8cyIr/La9qqLcWvVNqbWiac3jvJvgE6ef7BmeyrdwVkdlkt6jTSVmPXnNfqq7kTMUwLPgMw9EdIe5Qsslh9Md/z8Q6kwti92l3Fmjmm5WJoJwudwYtb8El0JnWRXEw617tT/8NnE/mi+EvDWegLFIZy3gNHA5ZtG7oodxjw0HDh2Brbr8UGuJ98bA2yjLG9AvK7UGfXcsJT4Ypcswm1LguwtfQYyHcaoqCvsTxfYC2b6bbxF5QTb2IDA0s2ywFg3M7T7YmWRVyrXAMpqTX6KxZA6ahtchxVYtyZinudOOa+f/QHgn3WwAxuUIVzX6eIod1hv17U2qJVVH/ThPwsNIISc0tV0QYwEZ4m15pQ5XZUhku5ANQGY4p6fR0ha8b/M5/txHT3QQorw3JlVKFBYZcc0Nbt9JpKIhczLmlzuhr54fFbcFeXgPsqDBbgoSJx5T0tTXphKW2WWjiGQiqpJIK8iKDnh+7Yff5RiLxXC8rUdc/K9O/gXICL7/BFA6yDaWpi4WldGKShshJZK8WpT3mSx+Fp6RIfjd7rE4Txw/1pN+JGRTwMaqWKC/m3ieZaiL5mKGrqwBEkJcLcIE2nQAzuHfEVzw3YkLUnvbp9LCVp2QW00gARw8wvZF+fRp74IgzMkngaWYGCX6kfIOobJxDziLvp6hiL7rb5IVW9XZGiAruK446iWpf12GLC2mktPjNEFTZIzAKpLLY6husEJr1tSSpNR3/Q3Cuhlka4tyvr7yPkAtEy2skrlUaKEUj9UmZLukAlFUQMGVYnoCCHnXJ8H7Txw9KzpzQdsCZATeM9UYuTf7TAHLXDaaSUV1nUAIKVGdEhmQGjt86x1Ymrl9e8oZee6dLwYCWcgjLcpdSfEHMzBWSbfCceGkf0lKTN6hQYBchyQgHZ6AICZRUtfcYNm1991c3cOLtpl//3x37kdA0wn3Lq80kuKpl+dXalRBvo5a40tBqMqh0RnAx9aLarTsZwP3XOmMftsdZGGffwj0PC7+zMeFjnBICAdDhVhZqUTYH4copKHV62xqnb4p+/2OARnhzY+A966IvyRF6UVGyYZIBYVV/wrmp53gNGr6AZ9+NQvYkUVZUea5JgBPKfXzlME4KBuhVqhUlUI8qfjJsUgMTvlK1UrFuUAwwG/7FOUWl/OsLuMAud9aTJ3YX2uZWY50jgeir3FaY3Uksto1dnesNx9ARkPLwfwd8k8FOjlUcrAMTRuKTCY7JQ+Px/NxPgC5zsbIaDeL7Hwyk/wF+sCa+6rHilgAAAAASUVORK5CYII=';


function getParsers(domain) {
    for (const [name, patterns] of Object.entries(DOMAINS)) {
        for (const pattern of patterns) {
            if (pattern.test(domain)) {
                const parsers = PARSERS[name];
                return parsers;
            }
        }
    }

    return DEFAULT_PARSERS;
}

const elements = {};
const parsers = getParsers(location.hostname);

function css(el, style) {
    for (const prop in style) {
        el.style[prop] = style[prop];
    }
}

function createOverlay(el) {
    const div = document.createElement('div');
    const a = document.createElement('a');
    const img = document.createElement('img');

    div.addEventListener('click', () => {
        el.focus();
    });
    a.href = '#';
    a.alt = 'Click to hide a message with Stegman';
    a.addEventListener('click', () => {
        chrome.runtime.sendMessage({
            from: 'content',
            subject: 'showPageAction',
        });
    });
    img.src = ICON;

    a.appendChild(img);
    div.appendChild(a);

    return div;
}

function highlight(el) {
    console.debug('highlighting', el);

    let overlay = elements[el];
    if (!overlay) {
        overlay = createOverlay(el);
    }
    const rect = el.getBoundingClientRect();

    overlay.classList.add('stegman-overlay');
    css(overlay, {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
    });

    console.debug('overlay:', overlay, 'rect:', rect);
    document.body.appendChild(overlay);

    elements[el] = overlay;
}

function lowlight(el) {
    const overlay = elements[el];
    if (!overlay) {
        return;
    }
    delete overlay[el];
    try {
        document.body.removeChild(overlay);
    } catch (e) {
        // Element may have been removed.
        if ('not a child' in e.message) {
            console.error(e);
            return;
        }
        throw e;
    }
}

function allDescendants(el, callback) {
    for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        allDescendants(child, callback);
        callback(child);
    }
}

function queryDispatch(el, callback) {
    parsers.forEach(parser => {
        if (typeof parser === 'string') {
            if (el?.matches && el.matches(parser)) {
                callback(el);
                return;
            }
            if (el.querySelectorAll) {
                el.querySelectorAll(parser).forEach(ell => {
                    callback(ell);
                    return;
                });
            }
        } else if (typeof parser === 'function') {
            if (parser(el)) {
                callback(el);
                return;
            }
            allDescendants(el, ell => {
                if (parser(ell)) {
                    callback(ell);
                }
            });
        }
    });
}

function initialize() {
    console.debug('initializing');

    (new MutationObserver((mutations) => {

        mutations.forEach(change => {
            if (change.type === 'attributes') {
                queryDispatch(change.target, highlight);
            } else if (change.type === 'childList') {
                change.addedNodes.forEach(el => {
                    queryDispatch(el, highlight);
                });
    
                change.removedNodes.forEach(el => {
                    queryDispatch(el, lowlight);
                });
            }
        });
    
    })).observe(document.body, { attributes: true, childList: true, subtree: true });
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        response({ foo: 'bar '});
    }
});

document.addEventListener('DOMContentLoaded', initialize);
