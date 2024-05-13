import { getRepoFiles } from "@bkl/services"
import { useFetchFactory } from "./useFetchFactory.js"

const baseOpts = {
    // Determines if the final tree should be flattened into an array
    // default is false
    flat: false,

    // Limit the number of times a node can be visited, default is 10
    limit: 10,

    // Root directory from which to start, default is "" (empty string)
    // Can be set to "src" to start from the 'src' directory
    root: "",

    // Function to customize the payload for each file. Receives a data object and should return a modified payload.
    // Default function returns a payload with path, type, and content of the file.
    parser: (data) => ({
        path: data.path,
        type: "file",
        content: Buffer.from(
            data.content,
            "base64",
        ).toString(),
    }),

    // Determines whether to recursively visit subdirectories, default is false
    recursive: false,
}

// Usage of the options with the useFetchFactory to fetch repository files
export const useRepoFiles = useFetchFactory(
    getRepoFiles,
    baseOpts,
)
