'use strict';
// Extenal libs
const Code = require( 'code' );
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();

// Import of what to test
const prepareOneTest = require( '../lib/preparation' ).prepareOneTest;
const runOneTest = require( '../lib/preparation' ).runOneTest;

// Resources
const Server = require( '../resources/server' );
const Lcrud = require( '../index' ).Lcrud;

lab.experiment( 'prepareOneTest', () => {

    lab.test( 'test building', ( done ) => {

        const title = 'Title: {pre.item1} {input.item}';
        const pres = [
            {
                assign: 'item1',
                name: 'item name',
                method: function ( reply ) {
                    //no err
                    reply( null, 10 );
                }
            }
        ];
        const paramSet = {
            titleComplement: 'complement',
            input: {
                item: 'Pony'
            },
            output: {
                statusCode: 200
            }
        };

        const preparedTest = prepareOneTest( title, paramSet, pres );

        Code.expect( preparedTest ).to.be.an.object();
        Code.expect( preparedTest.title ).to.equal( 'Title: item name Pony | complement' );
        Code.expect( preparedTest.input ).to.deep.equal( {
            item: 'Pony'
        } );
        Code.expect( preparedTest.output ).to.deep.equal( {
            statusCode: 200
        } );
        done();
    } );

    lab.test( 'test building without pre', ( done ) => {

        const title = 'Title: {input.item}';
        const paramSet = {
            titleComplement: 'complement',
            input: {
                item: 'Pony'
            },
            output: {
                statusCode: 200
            }
        };

        const preparedTest = prepareOneTest( title, paramSet );

        Code.expect( preparedTest ).to.be.an.object();
        Code.expect( preparedTest.title ).to.equal( 'Title: Pony | complement' );
        Code.expect( preparedTest.input ).to.deep.equal( {
            item: 'Pony'
        } );
        Code.expect( preparedTest.output ).to.deep.equal( {
            statusCode: 200
        } );
        done();
    } );
} );

lab.experiment( 'When the pre hav errors', ( done ) => {

    lab.test( 'Error in pre', ( done ) => {

        const title = 'Title: {pre.item1} {input.item}';
        const pres = [
            {
                assign: 'item1',
                name: 'item name',
                method: function ( reply ) {
                    // err
                    reply( new Error( 'error' ), null );
                }
            }
        ];
        const paramSet = {
            titleComplement: 'complement',
            input: {
                item: 'Pony'
            },
            output: {
                statusCode: 200
            }
        };
        const inject = function ( pre, input ) {

            const request = new Lcrud( '/items', null, null );
            return request.get( null, null );
        };

        const definition = {
            title: title,
            pre: pres,
            paramSets: [paramSet],
            inject: inject
        };

        const preparedTest = prepareOneTest( title, paramSet, pres );

        runOneTest( definition, Server, preparedTest, ( x ) => {

            Code.expect( x ).to.be.an.object();
            Code.expect( x ).to.exist();
            done();
        } );


    } );


} );
