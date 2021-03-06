/**
 * Created by seven on 2018/3/2.
 * fighting20xx@126.com
 */

'use strict'


var merge = require('utils-merge');
var parseUrl = require('parseurl');
var qs = require('qs');

module.exports = function query(options) {
    var opts = merge({},options);
    var queryparse = qs.parse;

    if (typeof  options === 'function') {
        queryparse = options;
        opts =undefined;
    }

    if (opts !== undefined && opts.allowPrototypes === undefined) {
        // back-compat for qs module
        opts.allowPrototypes = true;
    }

    return function query(req, res, next) {
        if (!req.query) {
            var val = parseUrl(req).query;
            req.query = queryparse(val, opts);
        }
        next();
    }
}