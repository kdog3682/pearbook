import { appendVariableFile, writeUnitTest, read, clip2, appendVariable2, clip, appendVariable, write, rpw, isFile, sysget, } from "/home/kdog3682/2023/node-utils.js"
import yaml from 'yaml'


/* deno-fmt-ignore */ import {datestamp, lorem, so, hr, no} from "/home/kdog3682/2023/utils.js"
import {
    recursivelyUploadDataObject,
    uploadCollections,
} from '/home/kdog3682/@bkl/packages/services/src/firebaseService.js'

// const chemistryAssignments = yaml.parse(read('/home/kdog3682/projects/pearbook/src/assignments.yml'))
// console.log(chemistryAssignments)
// uploadCollections(chemistryAssignments)


const pivnurt = {
    type: "collection",
    id: "users",
    value: [
        {
            type: "document",
            id: "pivnurt",
            value: [
                { type: "attribute", key: "age", value: 10 },
                {
                    type: "attribute",
                    key: "joinDate",
                    value: "05/15/2024",
                },
                {
                    type: "attribute",
                    key: "fullName",
                    value: "Pivnurt III",
                },
                {
                    type: "attribute",
                    key: "region",
                    value: "Meadowdale",
                },
                {
                    type: "attribute",
                    key: "class",
                    value: "6th Grade Chemistry",
                },
                {
                    type: "attribute",
                    key: "funFacts",
                    value: [
                        "I like to eat ice cream",
                        "I am a part-time detective",
                    ],
                },
                {
                    type: "collection",
                    key: "assignments",
                    value: [
                        {
                            type: "document",
                            value: {
                                score: 0,
                                status: "awaiting",
                                assignmentId: "G6-chemistry-1",
                            },
                        },
                        {
                            type: "document",
                            value: {
                                score: 0,
                                status: "awaiting",
                                assignmentId: "G6-chemistry-2",
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

// recursivelyUploadDataObject(pivnurt)


jean:

npcGroup hammy jean pivnurt gougou maomao

