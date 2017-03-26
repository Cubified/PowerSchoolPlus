/*
 * Dialogger v2.0.0
 * CubeDoodl 2017
 */

function DialoggerV2(options) {
    const opts = options || {
            onClose: function () {
            }
        };

    [].forEach.call(document.querySelectorAll('.Dialogger'), (e) => {
        const coverup = document.createElement('div');
        coverup.classList.add('Dialogger-coverup');
        e.innerHTML = coverup.outerHTML + e.innerHTML;
        e.addEventListener('click', (event) => {
            if (event.target.className === 'Dialogger-coverup') {
                e.hide();
            }
        });
        e.children[1].id = 'fullWidthParent';
        e.children[1].addEventListener('click', (event) => {
            if (event.target.id === 'fullWidthParent') {
                e.hide();
            }
        });

        e.show = () => {
            e.style.visibility = 'visible';
            e.style.display = 'flex';
            setTimeout(() => {
                e.style.opacity = 1;
            }, 10);
            e.dataset.visible = 'true';
        };
        e.hide = () => {
            e.style.opacity = 0;
            setTimeout(() => {
                e.style.visibility = 'hidden';
                e.style.display = 'none';
            }, 300);
            e.dataset.visible = 'false';
            opts.onClose();
        };
        e.toggleState = () => {
            if (e.dataset.visible === 'true') {
                e.hide();
            } else {
                e.show();
            }
        };
        if (e.dataset.visible === 'true') {
            e.show();
        } else if (e.dataset.visible === 'false') {
            e.hide();
        } else {
            e.dataset.visible = 'false';
        }
    });
}

module.exports = DialoggerV2;