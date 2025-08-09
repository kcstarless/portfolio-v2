export const capitalize = (str) => {
    // Replace spaces and dots with nothing for capitalization
    const noSpacesDots = str.replace(/[\s.]+/g, '')
    return noSpacesDots.charAt(0).toUpperCase() + noSpacesDots.slice(1)
}