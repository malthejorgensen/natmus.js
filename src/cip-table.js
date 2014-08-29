/**
 * Represents a table in CIP. End-users should not need to instantiate this class.
 * @constructor
 * @param {CIPClient} cip - The parent CIP object.
 * @param {CIPCatalog} catalog - The catalog to which the table belongs.
 * @param {string} name - The name of the table.
 */

if(typeof(exports) != "require") {
    cip_common = require('./cip-common.js');
}


function CIPTable(cip, catalog, name) {
    this.cip = cip;
    this.catalog = catalog;
    this.name = name;
    
    this.layout = null;

    // TODO: Must have a reference to the layout it uses
    
    /**
     * Returns the layout of the table.
     * @param {function} callback The callback.
     */
    this.get_layout = function(callback) {
        cip_common.assert(this.cip.is_connected());
        var returnvalue = null;
        var cip = this.cip;

        this.cip.ciprequest("metadata/getlayout/"+this.cip.config.constants.layout_alias, {
            catalogname: this.catalog.name,
            table: this.name
        }, function(response) {
            this.layout = response;

            callback(new CIPLayout(cip, this.layout.fields));
        }); 
        
    };
    
    /**
     * Free-text search in the table.
     * @param {string} query - The query to search for.
     */
    this.search = function(query, callback) {
        this.cip.search(this, query, callback);
    };

    this.criteriasearch = function(querystring, callback) {
        this.cip.criteriasearch(this, querystring, callback);
    };
}

if(typeof(exports) != "undefined") {
    exports.CIPTable = CIPTable;
}
