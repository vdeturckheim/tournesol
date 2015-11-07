'use strict';
const Hoek = require('hoek');

module.exports = function (baseURL, getPayload, getHeader) {

    this.baseURL = baseURL;

    const getPath = function (lcrud, base, resId) {

        const keys = Object.keys( base );
        let result = Hoek.clone(lcrud.baseURL);

        keys.forEach( (key) => {

            result = result.replace( '{' + key + '}', base[key] );
        } );

        if ( resId ) {
            result = result + '/' + resId;
        }
        return result + '';
    };

    this.get = function (pathOptions, headerOptions, resourceId) {

        return {
            method: 'GET',
            url: getPath( this, pathOptions, resourceId ),
            headers: getHeader( headerOptions )
        };
    };

    this.post = function ( pathOptions, headerOptions, payloadOptions) {

        return {
            method: 'POST',
            url: getPath( this, pathOptions ),
            headers: getHeader( headerOptions ),
            payload: getPayload( payloadOptions )
        };
    };

    this.put = function ( pathOptions, headerOptions, resourceId, payloadOptions) {

        return {
            method: 'PUT',
            url: getPath( this, pathOptions, resourceId ),
            headers: getHeader( headerOptions ),
            payload: getPayload( payloadOptions )
        };
    };

    this.delete = function (pathOptions, headerOptions, resourceId) {

        return {
            method: 'DELETE',
            url: getPath( this, pathOptions, resourceId ),
            headers: getHeader( headerOptions )
        };
    };
};
