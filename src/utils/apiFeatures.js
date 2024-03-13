export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let page = this.searchQuery.page * 1 || 1;
    let pageLimit = 15;
    let skip = (page - 1) * pageLimit;
    this.pageNumber = page ; 
    this.mongooseQuery.skip(skip).limit(pageLimit);
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  filter() {
    let filter = { ...this.searchQuery };
    let excludedObject = ["page", "sort", "fields", "keyword"];
    excludedObject.forEach((val) => {
      delete filter[val];
    });

    filter = JSON.stringify(filter);
    filter = filter.replace(/(gt|gte|lt|lte)/g, (match) => `$${match}`);
    filter = JSON.parse(filter);
    this.mongooseQuery.find(filter);
    return this;
  }

  fields() {
    if (this.searchQuery.fields) {
      let fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }

  search() {

    // search(fields = ['title', 'description']) {
    //     if (this.searchQuery.keyword) {
    //       let keyword = this.searchQuery.keyword;
      
    //       const orConditions = fields.map(field => ({
    //         [field]: { $regex: keyword, $options: 'i' } // 'i' option for case-insensitive search
    //       }));
      
    //       this.mongooseQuery.find({
    //         $or: orConditions,
    //       });
    //     }
    //     return this;
    //   }
    //   apiFeature.search(['title', 'description']);
    
    if (this.searchQuery.keyword) {
      let keyword = this.searchQuery.keyword;
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: keyword } },
          { description: { $regex: keyword } },
        ],
      });
    }
    return this;
  }
}
