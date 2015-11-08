'use strict';
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();
const Server = require( '../resources/server' );
const Lcrud = require( '../index' ).Lcrud;
const runTests = require( '../index' ).runTests;

lab.experiment('Test the example server using the main function', ( ) => {

    const definition = {
        title: 'Title of the test with {input.itemId}',
        pre: [],
        paramSets: [
            {
                input: {
                    titleComplement: 'hello mommy',
                    itemId: '10'
                },
                output: {
                    statusCode: 200
                }
            },
            {
                input: {
                    itemId: '20'
                },
                output: {
                    statusCode: 404
                }
            }
        ],
        inject: function ( pre, input ) {

            const request = new Lcrud( '/items', null, null );
            return request.get( null, null, input.itemId );
        }
    };

    runTests(definition, Server, lab);


});
