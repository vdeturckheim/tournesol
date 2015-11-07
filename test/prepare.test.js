'use strict';
// Extenal libs
const Code = require( 'code' );
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();

// Import of what to test
const prepare = require( '../lib/preparation' ).prepareOneTest;

lab.experiment( 'Build of a test definition', () => {

    lab.test( 'Build of a test definition without error in pre', ( done ) => {

        const title = 'Title of the test with {pre.item1} and {input.str} when {input.bool}';
        const input = {
            str: 'value',
            nb: 10,
            bool: true,
            arr: ['a']
        };
        const pre = [
            {
                assign: 'item1',
                name: 'item1Name',
                method: function ( reply ) {

                    // no err
                    reply( null, 10 );
                }
            },
            {
                assign: 'item2',
                name: 'item2Name',
                method: function ( reply ) {

                    // no err
                    reply( null, 20 );
                }
            }
        ];

        prepare( title, input, pre, ( errList, test ) => {

            Code.expect( errList ).to.be.an.array();
            Code.expect( errList ).to.be.empty();

            Code.expect( test ).to.be.an.object();

            Code.expect( test.title ).to.equal( 'Title of the test with item1Name and value when true' );

            Code.expect( test.input ).to.deep.equal( input );

            Code.expect( test.pre ).to.deep.equal( {
                item1: 10,
                item2: 20
            } );

            done();
        } );
    } );


    lab.test( 'Build of a test definition with error in pre', ( done ) => {

        const title = 'Title of the test with {pre.item1} and {input.str} when {input.bool}';
        const input = {
            titleComplement: 'complement',
            str: 'value',
            nb: 10,
            bool: true,
            arr: ['a']
        };
        const pre = [
            {
                assign: 'item1',
                name: 'item1Name',
                method: function ( reply ) {

                    // no err
                    reply( null, {
                        a: 10
                    } );
                }
            },
            {
                assign: 'item2',
                name: 'item2Name',
                method: function ( reply ) {

                    // err
                    reply( new Error( 'I hate unicorns.' ), null );
                }
            }
        ];

        prepare( title, input, pre, ( errList, test ) => {

            Code.expect( errList ).to.be.an.array();
            Code.expect( errList.length ).to.equal( 1 );

            Code.expect( test ).to.be.an.object();

            Code.expect( test.title ).to.equal( 'Title of the test with item1Name and value when true | complement' );

            Code.expect( test.input ).to.deep.equal( input );

            Code.expect( test.pre ).to.deep.equal( {
                item1: {
                    a: 10
                }
            } );

            done();
        } );
    } );

    lab.test( 'Build of a test definition without pre', ( done ) => {

        const title = 'Title of the test with {input.str} when {input.bool}';
        const input = {
            str: 'value',
            nb: 10,
            bool: true,
            arr: ['a']
        };
        const pre = null;

        prepare( title, input, pre, ( errList, test ) => {

            Code.expect( errList ).to.be.an.array();
            Code.expect( errList.length ).to.equal( 0 );

            Code.expect( test ).to.be.an.object();

            Code.expect( test.title ).to.equal( 'Title of the test with value when true' );

            Code.expect( test.input ).to.deep.equal( input );

            Code.expect( test.pre ).to.deep.equal( {} );

            done();
        } );
    } );

    lab.test( 'Build of a test definition without any arguments really', ( done ) => {

        const title = null;
        const input = null;
        const pre = null;

        prepare( title, input, pre, ( errList, test ) => {

            Code.expect( errList ).to.be.an.array();
            Code.expect( errList.length ).to.equal( 0 );

            Code.expect( test ).to.be.an.object();

            Code.expect( test.title ).to.equal( '' );

            Code.expect( test.input ).to.deep.equal( {} );

            Code.expect( test.pre ).to.deep.equal( {} );

            done();
        } );
    } );
} );


