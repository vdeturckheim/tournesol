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

    // TODO
    lab.test('Lcrud to forge a get request on /parents/parentId/items/itemId?option=x');

} );

lab.experiment( 'Lcrud.post /items', () => {

    lab.test( 'Lcrud to forge a post request on /items without header', ( done ) => {

        const getHeaders = null;
        const getPayload = ( y ) => ({ content: y, staticMeta: 10 });
        const item = new Lcrud( '/items', getPayload, getHeaders );

        const request = item.post( null, null, 'myContent' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'POST' );
        Code.expect( request.url ).to.equal( '/items' );
        Code.expect( request.headers ).to.deep.equal({});
        Code.expect( request.payload ).to.deep.equal({ content: 'myContent', staticMeta: 10 });
        done();
    } );
} );

lab.experiment( 'Lcrud.put /items/itemId', () => {

    lab.test( 'Lcrud to forge a put request on /items/itemId without header', ( done ) => {

        const getHeaders = null;
        const getPayload = ( y ) => ({ content: y, staticMeta: 10 });
        const item = new Lcrud( '/items', getPayload, getHeaders );

        const request = item.put( null, null, 'itemId', 'myNewContent' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'PUT' );
        Code.expect( request.url ).to.equal( '/items/itemId' );
        Code.expect( request.headers ).to.deep.equal({});
        Code.expect( request.payload ).to.deep.equal({ content: 'myNewContent', staticMeta: 10 });
        done();
    } );
} );

lab.experiment( 'Lcrud.delete /items/itemId', () => {

    lab.test( 'Lcrud to forge a delete request on /items/itemId without header', ( done ) => {

        const getHeaders = null;
        const getPayload = null;
        const item = new Lcrud( '/items', getPayload, getHeaders );

        const request = item.delete( null, null, 'itemId' );
        Code.expect( request ).to.be.an.object();
        Code.expect( request.method ).to.equal( 'DELETE' );
        Code.expect( request.url ).to.equal( '/items/itemId' );
        Code.expect( request.headers ).to.deep.equal({});
        Code.expect( request.payload ).to.not.exist();
        done();
    } );
});
