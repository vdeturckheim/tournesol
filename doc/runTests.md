# runTests

## Usage

```javascript
const Tournesol = require( 'tournesol' );
const Lcrud = require( 'tournesol' ).Lcrud;
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();

const Server = require( 'A Hapi server' ); // require the hapi server to test or build it within the test file. 

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
                titleComplement: 'hello mommy',
                input: {
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

    Tournesol.runTests(definition, Server, lab);
```

is equivalent to:

```javascript
const Lcrud = require( 'tournesol' ).Lcrud;
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();
const Server = require( 'A Hapi server' );
const Code = require( 'code' );

lab.test( 'Title of the test with value of half1 ( = 5) + 5 | hello mommy', (done) => {

    const getHalf1 = function (callback){

        callback( null, 5 );
    };

    const itemId = 5;

    const request = new Lcrud( '/items', null, null );

    getHalf1( (err, half1) => {

        if (err){
            done(err);
        }

        Server.inject( request.get( null, null, itemId + half1 ), ( response ) => {

            Code.expect(response.statusCode).to.equal(200);
            done();
        } );
    });
});

lab.test( 'Title of the test with value of half1 ( = 5) + 5', (done) => {

    const getHalf1 = function (callback){

        callback( null, 5 );
    };

    const itemId = 10;

    const request = new Lcrud( '/items', null, null );

    getHalf1( (err, half1) => {

        if (err){
            done(err);
        }

        Server.inject( request.get( null, null, itemId + half1 ), ( response ) => {

            Code.expect(response.statusCode).to.equal(404);
            done();
        } );
    });
});
```
## Details

The `runTests` function takes 3 arguments:

* `definition`: an object described later.
* `Server`: a Hapi server.
* `lab`: a `Lab.script()` object.

### Definition format

```javascript
{
        title: 'Title of the test with value of {pre.half1} + {input.itemId}', // The values between { } will be replaced by their actual values
        pre: [ // A list of methods to run before each test
            {
                assign: 'half1', // The result of this will be available as pre.half1
                name: 'half1 ( = 5)', // The name to put in the title
                method: function ( reply ) { // The method

                    // no err
                    reply( null, 5 ); // reply(err, result), if an error is present here, the test will fail with the list of all errors raised by pre-methods
                }
            }
        ],
        paramSets: [ // Each element of this list is a test
            {
                titleComplement: 'hello mommy', // Optional: if a complement is given, the title of the test will be '<rendered title> | complemnet'
                input: { // items that will be available in a 'input' variable
                    itemId: 5 // input.itemId = 5
                },
                output: { 
                    statusCode: 200, // Expected statusCode for this test
                    payload: function (code, payload){ // Optional: the response.payload can be tested with this, arguments are: (code, payload) = (and instance of Code, payload parsed as JSON)
                       
                        code.expect(payload.message).to.equal('hello');
                    }
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
        inject: function ( pre, input ) { // The function which result will be passed to Server.inject

            const request = new Lcrud( '/items', null, null );
            return request.get( null, null, input.itemId + pre.half1 );
        }
    }

```


