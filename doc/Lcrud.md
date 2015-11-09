# Lcrud

Creates requests ready to be used in a [Hapi server](https://github.com/hapijs/hapi) with `server.inject`.

## Init

```javascript
const Lcrud = require( 'tournesol' ).Lcrud;

var request = new Lcrud(baseURL, getPayload, getHeaders);
```

where:

* `baseURL` is a string describing the base URL for the resource. For instance:
    - `'/items'` would refer to the CRUD configuration: 
        * `GET /items` for listing items
        * `GET /items/itemId` for getting one specific item
        * `POST /items` for creating an item
        * `PUT /items/itemId` for updating one specific item
        * `DELETE /items/itemId` for deleting one specific item
    - `'/parents/{parentId}/items'` would refer to the CRUD configuration: 
        * `GET /parents/{parentId}/items` for listing items under a certain parent
        * `GET /parents/{parentId}/items/itemId` for getting one specific item under a certain parent
        * `POST /parents/{parentId}/items` for creating an item under a certain parent
        * `PUT /parents/{parentId}/items/itemId` for updating one specific item under a certain parent
        * `DELETE /parents/{parentId}/items/itemId` for deleting one specific item under a certain parent
* `getPayload` is the function that will be used to generates the payloads of the requests. For instance:
    - If you want to pass a whole payload to the request forge, you can just set:
    ```javascript
    function(payload){
        return payload;
    }
    ```
    - But if you want to change only one field of the payload and have the rest of it static, you can set it as:
    ```javascript
    function(myValue){
        return {
                staticValue: 10,
                changingValue: myValue
            }
    }
    ```
* `getHeaders` is the same as getPayload, but for headers.

## Usage

```javascript
const Lcrud = require( '../index' ).Lcrud;

var request = new Lcrud(baseURL, getPayload, getHeaders);
```

* `request.get( pathOptions, headerOptions, [resourceId] )`: Return a get request
    - `pathOptions`, options for baseURL, for instance if the baseUrl is `'/parent/{parentId}/items'`, the pathOptions shall be `{ parentId: 'actualParentId' }
    - `headerOptions`, argument object that will be passed to `getHeaders`
    - `resourceId`, OPTIONAL:
        * if omitted, the request url will look like `'/parent/{parentId}/items'`,
        * if present, the request url will look like `'/parent/{parentId}/items/resourceId'`
        
* `request.post( pathOptions, headerOptions, payloadOptions )`: Return a post request
    - `pathOptions`, options for baseURL, for instance if the baseUrl is `'/parent/{parentId}/items'`, the pathOptions shall be `{ parentId: 'actualParentId' }
    - `headerOptions`, argument object that will be passed to `getHeaders`
    - `payloadOptions`, argument object that will be passed to `getPayload`

* `request.put( pathOptions, headerOptions, resourceId, payloadOptions )`: Return a post request
    - `pathOptions`, options for baseURL, for instance if the baseUrl is `'/parent/{parentId}/items'`, the pathOptions shall be `{ parentId: 'actualParentId' }
    - `headerOptions`, argument object that will be passed to `getHeaders`
    - `resourceId`, id of the resource to update
    - `payloadOptions`, argument object that will be passed to `getPayload`

* `request.delete( pathOptions, headerOptions, resourceId )`: Return a post request
    - `pathOptions`, options for baseURL, for instance if the baseUrl is `'/parent/{parentId}/items'`, the pathOptions shall be `{ parentId: 'actualParentId' }
    - `headerOptions`, argument object that will be passed to `getHeaders`
    - `resourceId`, id of the resource to delete