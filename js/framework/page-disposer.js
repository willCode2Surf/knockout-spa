/**
 * @license Copyright (c) 2015 Cheng Fan
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
define(['Knockout', 'Sugar'], function (ko) {

    var initialValues = {};
    
    var PageDisposer = {
        init: function (page) {
            initialValues = {};
            Object.each(page, function (key, value) {
                if (ko.isObservable(value) && !ko.isComputed(value)) {
                    initialValues[key] = value();
                } else if ((value === null) || (value === undefined) || Object.isString(value) || Object.isNumber(value)) {
                    initialValues[key] = value;
                }
            });
        },
        dispose: function (page) {
            Object.each(initialValues, function (key, value) {
                if (page.hasOwnProperty(key)) {
                    if (Object.isFunction(page[key])) {
                        page[key](value);
                    } else {
                        page[key] = value;
                    }
                }
            });
            initialValues = {};
        }
    };

    return PageDisposer;

});
