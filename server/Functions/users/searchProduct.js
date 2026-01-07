const Fuse = require('fuse.js')
const products = require('../../Models/sellers/products')

async function search(searchText) {
    const productData = await products.find()
    const fuseOption = {
        isCaseSensitive: false,
        ignoreDiacritics: false,
        includeScore: true,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        location: 0,
        threshold: 0.3,
        distance: 100,
        useExtendedSearch: true,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1,
        keys: [
            "productName",
            "productDescription"
        ]

    }
    const fuse = new Fuse(productData, fuseOption)

    return fuse.search(searchText)
}

module.exports = { search }