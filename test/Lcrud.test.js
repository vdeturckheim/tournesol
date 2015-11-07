'use strict';
// Extenal libs
const Code = require( 'code' );
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();

// Import of what to test
const Lcrud = require( '../index' ).Lcrud;

lab.experiment( 'Lcrud.get /items', () => {

    lab.test( 'Lcrud to forge a get request on /items with header', ( done ) => {

        const getHeaders = ( x ) => ({ authorization: 'Bearer ' + x });
        const getPayload = null;
        const item = new Lcrud( '/items', getPayload, getHeaders );

        const request = item.get( {}, 'userToken' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'GET' );
        Code.expect( request.url ).to.equal( '/items' );
        Code.expect( request.headers.authorization ).to.equal( 'Bearer userToken' );
        Code.expect( request.payload ).to.not.exist();
        done();
    } );

    lab.test( 'Lcrud to forge a get request on /items/itemId with header', ( done ) => {

        const getHeaders = ( x ) => ({ authorization: 'Bearer ' + x });
        const getPayload = null;
        const item = new Lcrud( '/items', getPayload, getHeaders );

        const request = item.get( {}, 'userToken', 'itemId' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'GET' );
        Code.expect( request.url ).to.equal( '/items/itemId' );
        Code.expect( request.headers.authorization ).to.equal( 'Bearer userToken' );
        Code.expect( request.payload ).to.not.exist();
        done();
    } );
} );

lab.experiment( 'Lcrud.get /parents/parentId/items', () => {

    lab.test( 'Lcrud to forge a get request on /parents/parentId/items with header', ( done ) => {

        const getHeaders = ( x ) => ({ authorization: 'Bearer ' + x });
        const getPayload = null;
        const item = new Lcrud( '/parents/{parentId}/items', getPayload, getHeaders );
        const pathOptions = { parentId: 'actualParentId' };

        const request = item.get( pathOptions, 'userToken' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'GET' );
        Code.expect( request.url ).to.equal( '/parents/actualParentId/items' );
        Code.expect( request.headers.authorization ).to.equal( 'Bearer userToken' );
        Code.expect( request.payload ).to.not.exist();
        done();
    } );

    lab.test( 'Lcrud to forge a get request on /parents/parentId/items/itemId with header', ( done ) => {

        const getHeaders = ( x ) => ({ authorization: 'Bearer ' + x });
        const getPayload = null;
        const item = new Lcrud( '/parents/{parentId}/items', getPayload, getHeaders );
        const pathOptions = { parentId: 'actualParentId' };

        const request = item.get( pathOptions, 'userToken', 'itemId' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'GET' );
        Code.expect( request.url ).to.equal( '/parents/actualParentId/items/itemId' );
        Code.expect( request.headers.authorization ).to.equal( 'Bearer userToken' );
        Code.expect( request.payload ).to.not.exist();
        done();
    } );
} );
