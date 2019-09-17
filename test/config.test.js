/*This file is set up the configuration for test framework */

// const request = require('request');
require('dotenv').config({path : '../config/.env'});
const config = process.env;
const Parse = require('parse/node');
//SETTING PARSE COINFIGURATIONS
Parse.initialize('BtfUmtNPGHkC3UbiwVsHFakZF4HjVVwc07ethBsm');
Parse.masterKey = 'MaMd3KeO0oTRAhNJzMY8hIloycQWWcXU2Phj8iYF';
Parse.serverURL = "http://localhost:1337/parse";
global.Parse = Parse;
/* END CONFIGURATION */