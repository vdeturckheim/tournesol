'use strict';
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();
const Server = require( '../resources/server' );
const Lcrud = require( '../index' ).Lcrud;
const runTests = require( '../index' ).runTests;

lab.experiment('Test the example server using the main function', ( ) => {

    const definition = {
        title: 'Title of the test with value of {pre.half1} + {input.itemId}',
        pre: [
            {
                assign: 'half1',
                name: 'half1 ( = 5)',
                method: function ( reply ) {

                    // no err
                    reply( null, 5 );
                }
            }
        ],
        paramSets: [
            {
                input: {
                    titleComplement: 'hello mommy',
                    itemId: 5
                },
                output: {
                    statusCode: 200
                }
            },
            {
                input: {
                    itemId: 10
                },
                output: {
                    statusCode: 404
                }
            }
        ],
        inject: function ( pre, input ) {

            const request = new Lcrud( '/items', null, null );
            return request.get( null, null, input.itemId + pre.half1 );
        }
    };

    runTests(definition, Server, lab);


});

lab.experiment('Test the example server using the main function on the other route', ( ) => {

    const definition = {
        title: 'Title of the test ',
        pre: [],
        paramSets: [
            {
                input: { },
                output: {
                    statusCode: 200,
                    payload: function (code, payload){

                        code.expect(payload.message).to.equal('hello');
                    }
                }
            }
        ],
        inject: function ( pre, input ) {

            const request = new Lcrud( '/items', null, null );
            return request.get( null, null );
        }
    };

    runTests(definition, Server, lab);
});
