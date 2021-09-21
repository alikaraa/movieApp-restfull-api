const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, "`{PATH}` alani zorunludur"],
    maxlength: [64, "`{PATH}` alani (`{VALUE}` zorunludur)"],
    minlength: 1,
  },
  category: String,
  country: String,
  year: Number,
  imdb_score: Number,
  director_id: Schema.Types.ObjectId, //object id tipinde tutulmasi gerekiyor o yuzden boyle yazidk
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("movie", MovieSchema);
