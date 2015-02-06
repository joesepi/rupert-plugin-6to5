Path = require('path')
server =
  name: 'rupert-plugin-6to5.test'
  root: __dirname
  plugins:
    dependencies: {}
  stassets:
    root: './'
    scripts:
      types: ['sample']

server.plugins.dependencies[Path.resolve(__dirname, '../src/config')] = yes

rupert = require('rupert')(server)
config = rupert.config
unless describe?
  rupert.start()
else
  describe 'Rupert Plugin 6to5', ->
    it.skip 'attaches scripts to the config', ->
      config.stassets.vendors.js.length.should.equal 10

    it 'compiles es6 into es5', (done)->
      rupert.then ->
        rupert.app.stassets.promise.then ->
          require('supertest')(rupert.app)
          .get('/application.js')
          .expect(200)
          .expect ({text})->
              console.log(text)
              return
          .end(done)
