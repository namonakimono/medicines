// [p0] Search the existing (only) group of similar drugs in the 'database'

// [p0] Show all groups, and managements (CRUD)

// [p1] Add a new drug (name and photos) to some existing group (or the one just searched)

// [p1] Delete a a drug from some existing group

// [p1] Delete a whole group

// Search --> no result --> show existing ones --> add to some specific existing group or init new group
// Search --> show result --> learn or go back
// Manage all

class DrugInfo {
    name: string
    photoPath: Array<string>
    // could add more properties later
    constructor(n : string, pp : Array<string>) {
        this.name = n;
        this.photoPath = pp;
    }
}

type SimilarGroup = Array<string>

function createIndex(arr : SimilarGroup) : Map<string, SimilarGroup> {
    const res = new Map<string, SimilarGroup>();
    arr.forEach(e => {
        res.set(e, arr);
    })
    return res;
}

function createAllIndex(arr : Array<SimilarGroup>): Map<string, SimilarGroup> {
    return arr.map(createIndex).reduce((es, e) => mergeIntoLeftMap(es,e), new Map());
}

function mergeIntoLeftMap(lMap: Map<string, SimilarGroup>, rMap: Map<string, SimilarGroup>): Map<string, SimilarGroup> {
    rMap.forEach((value, key) => {
      if(lMap.has(key)) {
        (lMap.get(key) as SimilarGroup).push(...value);
      } else {
        lMap.set(key, value);
      }
    });
    return lMap;
}

// 数据，相似药品放入一组
const testData : Array<SimilarGroup> = [
    ['青霉素', '蓝霉素', '绿霉素', '黄霉素', '红霉素', '黑霉素'],
    ['板蓝根', '板青根', '板绿根', '板黄根', '板红根', '板黑根']
]

const memoryData = createAllIndex(testData);

function removeDup(arr) {
    return Array.from(new Set(arr))
}