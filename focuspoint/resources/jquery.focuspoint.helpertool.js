(function ($) {

    // Skip css transitions
    var prefix = (function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1];
        return {
            dom: pre == 'ms' ? pre.toUpperCase() : pre,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };

    })();

    var requestFrame = (function () {
        var raf = window.requestAnimationFrame ||
            window[prefix.lowercase + 'RequestAnimationFrame'] ||
            function (fn) {
                return window.setTimeout(fn, 20);
            };
        return function (fn) {
            return raf.call(window, fn);
        };
    })();

    var skipTransition = function (element, fn, bind) {
        var prop = prefix.js + 'TransitionProperty';
        element.style[prop] = element.style.transitionProperty = 'none';
        var callback;
        if (fn) callback = fn.call(bind);
        requestFrame(function () {
            requestFrame(function () {
                element.style[prop] = element.style.transitionProperty = '';
                if (callback) requestFrame(callback);
            });
        });
    };

    Craft.FocusPointHelper = Garnish.Base.extend({

        $this: null,
        $parentInput: null,
        $elements: null,
        $data: null,
        $buttons: null,
        name: null,
        reticle: null,
        modals: null,

        init: function (id) {
            var that = this;

            this.$this = $('#' + id);
            this.$parentInput = this.$this.closest(".input").find(">input[type='hidden']");
            this.$elements = this.$this.find(".elements");
            this.$data = this.$this.find('.focuspoint-data');
            this.$buttons = this.$this.find('.focuspoint-buttons');
            this.name = this.$data.data("name");
            this.reticle = this.$data.data("reticle");
            this.modals = [];

            this.$this.data('elementSelect')
                .on('selectElements', function (e) {

                    var $newElements = that.$elements.find('.element').slice(-e.elements.length);

                    $newElements.each(function (i, e) {
                        var $newEl = $(e);
                        var index = that.$elements.find('.element').index($newEl);
                        var id = $newEl.data('id');
                        var label = $newEl.data("label");

                        that.$buttons.show();

                        $(
                            '<div data-id="' + id + '">' +
                            '    <input type="hidden" name="' + that.$parentInput.attr("name") + '[focus-attr][' + index + '][data-focus-x]" value="0">' +
                            '    <input type="hidden" name="' + that.$parentInput.attr("name") + '[focus-attr][' + index + '][data-focus-y]" value="0">' +
                            '</div>'
                        )
                            .appendTo(that.$data);

                        $(
                            '<div class="btn edit icon btn--focuspoint" data-id="' + id + '">' + label + '</div>'
                        )
                            .appendTo(that.$buttons);

                        that.initializeModal(id);
                    });

                });

            this.$this.data('elementSelect')
                .on('removeElements', function (e) {

                    var id = 0;

                    that.$data.find(">div").each(function () {

                        if (e.target.$elements.filter('[data-id="' + $(this).data('id') + '"]').length < 1) {

                            id = $(this).data("id");
                            $(this).remove();

                        }

                    });

                    if (that.$data.find(">div").length < 1) {
                        that.$buttons.hide();
                    }

                    that.$buttons.find('[data-id="' + id + '"]').remove();

                    that.updateInputs();
                    that.destroyModal(id);

                });

            this.$data.find('>div').each(function (i) {

                that.initializeModal($(this).data("id"));

            });

            this.$this.on("click", ".btn--focuspoint", function () {

                var $parent = $(this).closest("div");
                var id = $parent.data("id");

                that.modals[id].show();

                return false;

            });
        },

        getElementIndex: function (id) {

            return this.$elements.find(".element").index(this.$elements.find("[data-id='" + id + "']"));

        },

        initializeHelperTool: function (helperTool) {

            var $helperTool = $(helperTool);
            var $focusPointContainers;
            var id = $helperTool.data('id');
            var index = this.getElementIndex(id);
            var $helperToolImage = $helperTool.find('img.helper-tool-img, img.target-overlay');
            var $inputX = this.$data.find('input[name*="[' + index + '][data-focus-x]"]');
            var $inputY = this.$data.find('input[name*="[' + index + '][data-focus-y]"]');

            var focusPointAttr = {
                x: 0,
                y: 0
            };

            var updateCoordinates = function (focusX, focusY) {

                focusPointAttr.x = isNaN(focusX) ? 0 : focusX;
                focusPointAttr.y = isNaN(focusY) ? 0 : focusY;

                $inputX.val(focusPointAttr.x.toFixed(2));
                $inputY.val(focusPointAttr.y.toFixed(2));

                var percentageX = (focusX / 2 + 0.5) * 100;
                var percentageY = (focusY / -2 + 0.5) * 100;

                $helperTool.find('.reticle').css({
                    'top': percentageY + '%',
                    'left': percentageX + '%'
                });

            };

            var updateFocusPoint = function () {
                $focusPointContainers.data('focusX', focusPointAttr.x);
                $focusPointContainers.data('focusY', focusPointAttr.y);
                $focusPointContainers.adjustFocus();
            };

            $helperToolImage.click(function (e) {

                var imageW = $helperToolImage.width();
                var imageH = $helperToolImage.height();
                var offsetX = e.pageX - $(this).offset().left;
                var offsetY = e.pageY - $(this).offset().top;
                var focusX = (offsetX / imageW - .5) * 2;
                var focusY = (offsetY / imageH - .5) * -2;

                updateCoordinates(focusX, focusY);
                updateFocusPoint();

            });

            for (var i = 1; i < 10; i++) {
                var $frame = $('<div class="frame' + i + '" />');
                $frame.appendTo($helperTool.find('.frames'));

                $('<div class="focuspoint" data-focus-x="0" data-focus-y="0"><img src="' + $helperToolImage.attr('src') + '"></div>')
                    .appendTo($frame)
                    .focusPoint();
            }

            $focusPointContainers = $helperTool.find('.focuspoint');

            updateCoordinates(parseFloat($inputX.val()), parseFloat($inputY.val()));
            updateFocusPoint();

        },

        updateInputs: function () {

            this.$data.find(">div").each(function (i) {

                $(this).find('input[type="hidden"]').each(function () {

                    $(this).attr("name", $(this).attr("name").replace(/\[focus\-attr]\[[0-9]]/i, "[focus-attr][" + i + "]"));

                });

            });

        },

        initializeModal: function (id) {
            var image = this.$elements.find(".element[data-id='" + id + "']").data('url');

            var $modal = $(
                '<div class="modal elementselectormodal helper-tool" data-id="' + id + '">' +
                '    <div class="body">' +
                '        <div class="content">' +
                '            <div class="main">' +
                '                <div class="helper-tool-target-wrapper">' +
                '                    <div class="helper-tool-target">' +
                '                        <img class="helper-tool-img" src="' + image + '">' +
                '                        <img class="reticle" src="' + this.reticle + '">' +
                '                        <img class="target-overlay" src="' + image + '">' +
                '                    </div>' +
                '                </div>' +
                '                <div class="frames"></div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '    <div class="footer">' +
                '        <div class="buttons right">' +
                '            <div class="btn submit">Ok</div>' +
                '        </div>' +
                '    </div>' +
                '</div>'
            );

            var updateFocusPoint = function () {
                $(".focuspoint").each(function (i, e) {
                    skipTransition($(e).find("img")[0], function () {
                        $(e).adjustFocus();
                    });
                });
            };

            var timeoutFunc = function () {
                updateFocusPoint();

                timeout = null;
            };
            var timeoutInt = 100;

            var timeout = null;

            var myModal = new Garnish.Modal($modal, {
                autoShow: false,
                resizable: true
            });

            var oldWidth = $modal.width();
            var oldDisplay = "none";
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.target === $modal[0] && mutation.attributeName === 'style') {
                        if (oldDisplay !== $modal[0].style.display) {
                            updateFocusPoint();
                            oldDisplay = $modal[0].style.display;
                        }

                        if (oldWidth !== $modal[0].style.width) {
                            if (timeout == null) {
                                timeout = setTimeout(timeoutFunc, timeoutInt);
                            }
                            oldWidth = $modal[0].style.width;
                        }
                    }
                });
            });

            var observerConfig = {
                attributes: true,
                childList: false,
                characterData: false,
                subtree: false,
                attributeOldValue: false,
                characterDataOldValue: false,
                attributeFilter: ["style"]
            };

            observer.observe($modal[0], observerConfig);

            $modal.find(".submit").click(function () {
                myModal.hide();
            });

            this.initializeHelperTool($modal);

            this.modals[id] = myModal;
        },

        destroyModal: function (id) {
            this.modals[id].destroy();
        }

    });

}(jQuery));

Craft.registerElementIndexClass('FocusPoint_Asset', Craft.AssetIndex);