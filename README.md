# Tournesol

[![Join the chat at https://gitter.im/vdeturckheim/tournesol](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vdeturckheim/tournesol?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/vdeturckheim/tournesol.svg?branch=master)](https://travis-ci.org/vdeturckheim/tournesol)

A Hapi-Glue-Lab-Code tool that could only be created by a crazy scientist.

```shell
$ npm install tournesol
```

# Purpose

This package aims at making api tests using Hapi, Lab and Code easier. The idea is to focus on what the tests mean rather than how to perform them.

# Usage

```javascript
const Lcrud = require( 'tournesol' ).Lcrud;

var request = new Lcrud(baseURL, getPayload, getHeaders);
```

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



# Doc

Please refer to: 

* [Lcrud](doc/Lcrud.md): List + CRUD, to generates requests for tests.
* [runTests](doc/runTests.md): to run tests from a nice definition object.


# About the name

Tournesol is the french name of the crazy professor in [The Adventures of Tintin](https://en.wikipedia.org/wiki/The_Adventures_of_Tintin).
You may know him by the name of [Professor Calculus](https://en.wikipedia.org/wiki/Professor_Calculus).
This name was chosen since this package turns [Lab](https://github.com/hapijs/lab) into the home of a mad scientist.

