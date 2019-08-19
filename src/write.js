const query = require('./db')
const debug = require('debug')('movie:write')

const write = async (movies) => {
    debug('开始写入电影信息')
    for (let movie of movies) {
        let odlMovie = await query('SELECT * FROM crawler_movie WHERE id=? LIMIT 1', [movie.id])
        if (Array.isArray(odlMovie) && odlMovie.length) {
            let old = odlMovie[0]
            await query('UPDATE crawler_movie SET name=?, href=?, image=?, score=? WHERE id=?', [movie.name, movie.href, movie.image, movie.score, old.id])
        }else{
            await query('INSERT INTO crawler_movie(id,name,href,image,score) VALUES(?,?,?,?,?)',[movie.id, movie.name, movie.href, movie.image, movie.score])
        }
        debug(`正在写入电影：${movie.name}`)
    }
}

module.exports = write