apidoc
======

RESTfull API documentation tool by using Nodejs and MongoDB which is acting as a CMS that tailor-maded for the API-documentation.
This contains both frontend and backend functionalities to easily maintain documentation with attactive user interfaces painted with twitter-bootstrap.

Requirements
============

* NodeJs server : [Documentation](http://nodejs.org/)
* MongoDB : [Documentation](http://docs.mongodb.org/manual/installation/)


Install
=======

1.To install the most recent release from npm, run inside the parent dir:

    npm install
    
This will install all required nodejs packages mentioned in package.json

2.Update /lib/db.js file according to your database configurations

3.Run app.js file from node

    node app

Then your DONE.Visit http://localhost:3000 to see the result
And for the admin area visit http://localhost:3000/api-admin

You might need some data filled with the database to view colorfull doc.
Enjoy ...

Introduction
============

This is a simple documentation application which can be use to document RESTfull api functionalities.

Used technologies/modules 
=========================
        * NoSQL database [ MongoDB ]
        * Nodejs 
            * express [ nodejs framework]
            * ejs [ node templating engine ]
            * mongoose [ mongoDB driver for nodejs ]
        

Todo
====
* GUI improvements
* User( role base ) authentication
* Administration functionalities
  * CRUD operations of api data >> done
* Support multiple database drivers ( MySQL, CouchDB, FileSysStorage, etc... )
* Add more TODOs to TODO list


Release Notes
=============

See HISTORY

License
=======
Copyright © 2013 Nuwan Madhawa(its4nuwan@gmail.com)

Licensed under the [GPL license v2](http://www.gnu.org/licenses/gpl-2.0.html)

