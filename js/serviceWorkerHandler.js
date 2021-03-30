

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/cashe-worker.js', {
            scope: '/',
            headers: {
                "Service-Worker-Allowed": '/',
                "Service-Worker": '/'
            }
        }).then(function (registration) {
            let serviceWorker;
            if (registration.installing) {
                serviceWorker = registration.installing;
                // document.querySelector('#kind').textContent = 'installing';
            } else if (registration.waiting) {
                serviceWorker = registration.waiting;
                // document.querySelector('#kind').textContent = 'waiting';
            } else if (registration.active) {
                serviceWorker = registration.active;
                // document.querySelector('#kind').textContent = 'active';
            }
            if (serviceWorker) {
                // logState(serviceWorker.state);
                serviceWorker.addEventListener('statechange', function (e) {
                    // logState(e.target.state);
                });
            }
        }).catch (function (error) {
            // console.error('error: ', error);
            // Something went wrong during registration. The service-worker.js file
            // might be unavailable or contain a syntax error.
        });
    } else {
        // The current browser doesn't support service workers.
        // Perhaps it is too old or we are not in a Secure Context.
        console.warn('The current browser doesn\'t support service workers');
    }
