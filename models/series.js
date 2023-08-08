import mongoose from "mongoose"

const Schema = mongoose.Schema;

const movieschema = new Schema({
  Name : String
})

const Series = mongoose.model('series',movieschema)

export default Series