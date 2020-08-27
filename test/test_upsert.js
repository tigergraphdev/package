const expect = require('chai').expect;
const upsert = require('../src/logic/upsert')
const { Vertex } = require('../src/models/vertex');
const { Edge } = require('../src/models/edges');


describe('Upsert Tests', () => {

    it('Test: getUpsertVertex()', () => {
        let x = new Vertex({
            type: "Person",
            id: "270",
            attr : [
                {
                    name: 'fullName',
                    value: 'Einstein',
                }
            ]
        });

        let obj = upsert.getUpsertVertex(x);

        let testObj = obj['vertices']['Person']['270'];

        expect(testObj['fullName']['value']).to.equal('Einstein');
        expect(testObj['fullName']['op']).to.equal('~');
    })

    it('Test: getUpsertVertices()', () => {
        let x = new Vertex({
            type: "Person",
            id: "270",
            attr : [
                {
                    name: 'fullName',
                    value: 'Einstein',
                }
            ]
        });

        let y = new Vertex({
            type: "Person",
            id: "317",
            attr : [
                {
                    name: 'fullName',
                    value: 'Pascal',
                }
            ]
        });

        let obj = upsert.getUpsertVertices([x,y]);

        expect(obj['vertices']['Person']['270']['fullName']['value']).to.equal('Einstein');
        expect(obj['vertices']['Person']['270']['fullName']['op']).to.equal('~');

        expect(obj['vertices']['Person']['317']['fullName']['value']).to.equal('Pascal');
        expect(obj['vertices']['Person']['317']['fullName']['op']).to.equal('~');
    })

    it('Test : getUpsertEdge()', () => {
        let x = new Vertex({
            type: "Person",
            id: "270",
            attr : [
                {
                    name: 'fullName',
                    value: 'Einstein',
                }
            ]
        });

        let y = new Vertex({
            type: "HotelStay",
            id: "Dhanmondi Hotel",
            attr : [
                {
                    name: 'eventDate',
                    value: '0',
                }
            ]
        });

        let edge = new Edge({
            
            sourceVertex: x,
            targetVertex: y,
            type: "hasHotelStay",

        });

        console.log(JSON.stringify(upsert.getUpsertEdge(edge)));

    })
});