/**
 * Get url parameter's value
 * 
 * @param {string} parameter 
 */
export default function getUrlParameter(parameter: string)
    : string | undefined {
    const result = new RegExp('[?&]' + parameter + '=([^&#]*)')
        .exec(window.location.search);

    if (result !== null) {
        return result[1] || undefined;
    }

    return undefined;
}