/** 
 * @param {string} type - The query type to execute [`query` | `mutation`]
 * @param {string} query - The query to execute via `schema`/`resolver`
 * @param {string} data - The data to send
 * @param {string} variables - The `GraphQL` variables
 * @returns Query `response` in `json` format
 * 
 * @example qdb(type: "query", query: "grabUsername", data: `username: "TheFirstUser"`, variables: "username");
 * 
 */
const qdb = async (type, query, data, variables) => {
    console.warn(`${type} {
        ${query} (
            ${JSON.stringify(data)}
        )
        {${variables}}
    }`);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
        let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: type!==null ? 
            JSON.stringify({
                query:
                `${type} {
                    ${query} (
                        ${data}
                    )
                    {${variables}}
                }`
            }) : JSON.stringify({
                query:
                `{
                    ${query} 
                    {${variables}}
                }`
            }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return -1;
        // setState({
        //   msg: `Problem loading server data - ${error.message}`,
        // });
    }
};

export default qdb;