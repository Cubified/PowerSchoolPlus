'use strict';

/*
 * Dialogger v0.0.1
 * Andrew Russell 2016
 */

var Dialogger = {
    elements: [],
    attach: function attach(q) {
        var self = this;
        [].forEach.call(document.querySelectorAll(q), function (e, i, a) {
            self.elements.push(e);
        });
    },
    init: function init(opts) {
        [].forEach.call(this.elements, function (e, i, a) {
            var Coverup = document.createElement('div');
            Coverup.classList.add('Dialogger-Coverup');
            Coverup.addEventListener('click', function () {
                e.toggleState();
            });
            var Background = document.createElement('div');
            Background.classList.add('Dialogger-Background');
            var Content = document.createElement('div');
            Content.classList.add('Dialogger-Content');
            Content.innerHTML = e.innerHTML;
            e.innerHTML = '';
            e.classList.add('Dialogger');
            e.appendChild(Coverup);
            e.appendChild(Background);
            e.appendChild(Content);

            e.style.visibility = 'hidden';
            e.style.opacity = 0;

            e.isOpen = false;

            e.open = function () {
                this.isOpen = true;
                this.style.visibility = 'visible';
                this.style.opacity = 1;
            };
            e.close = function () {
                this.isOpen = false;
                this.style.opacity = 0;
                var s = this;
                setTimeout(function () {
                    s.style.visibility = 'hidden';
                }, 220);
            };
            e.toggleState = function () {
                if (this.isOpen) {
                    this.close();
                    if (opts !== undefined && opts.onClose !== undefined) {
                        opts.onClose();
                    }
                } else {
                    this.open();
                    if (opts !== undefined && opts.onOpen !== undefined) {
                        opts.onOpen();
                    }
                }
            };
        });
    }
};

module.exports = Dialogger;