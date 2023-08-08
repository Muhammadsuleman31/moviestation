import mongoose from "mongoose"

const Schema = mongoose.Schema;

const movieschema = new Schema({
  title : String,
  imdb : Object,
  year : Number,
  genres : Array,
  poster: String,
  runtime:Number,
  fullplot:String

})

const Movies = mongoose.model('movies',movieschema)

export default Movies