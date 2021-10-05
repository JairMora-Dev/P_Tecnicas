const fetch =  require('node-fetch');

const url = `https://hiring.condorlabs.io/api/countries/all`;

async function search ({pageNumber, pageSize, from, to, region, sort}){
    try {
        const response = await fetch(url);
        const res = await response.json();


        const findbyPopulation = res.filter(p => p.population < to && p.population > from);
        if(from && to){
            const fPopulation = findbyPopulation.splice((0+pageSize)*(pageNumber-1), (0+pageSize)*(pageNumber-1)+ pageSize);
            return fPopulation;
        }
        
        const findbyRegion = res.filter(p => p.region == region);
        if(region){
            if(sort.name==='desc'){
                const nameRegion = findbyRegion.sort( (a,b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if(nameB > nameA){
                        return 1;
                    } if (nameA > nameB){
                        return -1;
                    }
                });
                const fRegion = nameRegion.splice((0+pageSize)*(pageNumber-1), (0+pageSize)*(pageNumber-1)+ pageSize);
                return fRegion;
            }else{
                const nameRegion = findbyRegion.sort( (a,b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if(nameB > nameA){
                        return -1;
                    } if (nameA > nameB){
                        return 1;
                    }
                });
                const fRegion = nameRegion.splice((0+pageSize)*(pageNumber-1), (0+pageSize)*(pageNumber-1)+ pageSize);
                return fRegion;
            }
        }

        const respo = res.splice((0+pageSize)*(pageNumber-1), (0+pageSize)*(pageNumber-1)+ pageSize);
        return respo;
    } catch (error) {
        return error;
    }
};

module.exports = { search };
 
