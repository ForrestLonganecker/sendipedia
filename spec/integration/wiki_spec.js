const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/wikis';

const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require('../../src/db/models').Wiki;
const User = require('../../src/db/models').User;

describe('routes : wikis', () => {
  beforeEach((done) => {
    this.wiki;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      
      User.create({
        name: 'Cliff Smith',
        email: 'rock@climb.com',
        password: '123456'
      })
      .then((user) => {
        this.user = user;

        Wiki.create({
          title: 'Carver',
          body: 'The moss factory',
          private: false,
          userId: this.user.id
        })
        .then((wiki) => {
          this.wiki = wiki;
          done();
        })
        .catch((err) => {
          console.log(err)
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

  // describe('admin user performing CRUD actions for Wiki', () => {
  //   beforeEach((done) => {
  //     User.create({
  //       name: 'Add Min',
  //       email: 'admin@email.com',
  //       password: '123456',
  //       role: 'admin'
  //     })
  //     .then((user) => {
  //       request.get({
  //         url: 'http://localhost:/auth/fake',
  //         form: {
  //           role: user.role,
  //           userId: user.id,
  //           email: user.email
  //         }
  //       },
  //         (err, res, body) => {
  //           done();
  //         }
  //       );
  //     });
  //   });

  //   describe('GET /wikis', () => {
  //     it('should return a status code of 200, and all wikis', (done) => {
  //       request.get(base, (err, res, body) => {
  //         expect(res.statusCode).toBe(200);
  //         expect(err).toBeNull();
  //         expect(body).toContain('Wikis');
  //         expect(body).toContain('Carver');
  //         done();
  //       });
  //     });
  //   });
    
  //   describe('GET /wikis/new', () => {
  //     it('should render a new wiki form', (done) =>  {
  //       request.get(`${base}/new`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain('New Wiki');
  //         done();
  //       });
  //     });
  
  //   });
  
  //   describe('GET /wikis/:id', () => {
  //     it('should render a view with the selected wiki', (done) => {
  //       request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain('Carver');
  //         expect(body).toContain('The moss factory');
  //         done();
  //       });
  //     });
  //   });
  
  //   describe('GET /wikis/:id/edit', () => {
  //     it('should render a view with an edit topic form', (done) => {
  //       request.get(`${base}/${this.wiki.id}/edit`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain('Edit Wiki');
  //         expect(body).toContain('Carver');
  //         expect(body).toContain('The moss factory');
  //         done();
  //       });
  //     });
  //   });
  
  //   describe('POST /wikis/create', () => {
  //     it('should create a new wiki and redirect', (done) => {
  //       const options = {
  //         url:`${base}/create`,
  //         form: {
  //           title: 'Ozone',
  //           body: 'Lothlorien feel',
  //           private: false,
  //           userId: this.user.id
  //         }
  //       };
  
  //       request.post(options, (err, res, body) => {
  //         Wiki.findOne({where: {title: 'Ozone'}})
  //         .then((wiki) => {
  //           expect(res.statusCode).toBe(303);
  //           expect(wiki.title).toBe('Ozone');
  //           expect(wiki.body).toBe('Lothlorien feel');
  //           done();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           done();
  //         });
  //       })
  //     });
      
  //   });
  
  //   describe('POST /wikis/:id/destroy', () => {
  //     it('should delete the wiki with the associated ID', (done) => {
  //       Wiki.findAll()
  //       .then((wikis) => {
  //         const wikiCountBeforeDelete = wikis.length;
  //         expect(wikiCountBeforeDelete).toBe(1);
  
  //         request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
  //           Wiki.findAll()
  //           .then((wikis) => {
  //             expect(err).toBeNull();
  //             expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
  //             done();
  //           })
  //         });
  //       });
  //     });
  //   });
  
  //   describe('POST /wikis/:id/update', () => {
  //     it('should update the topic with the given values', (done) => {
  //       const options = {
  //         url: `${base}/${this.wiki.id}/update`,
  //         form: {
  //           title: 'Carver, OR',
  //           body: 'Twilight boulders'
  //         }
  //       };
  
  //       request.post(options, (err, res, body) => {
  //         expect(err).toBeNull();
  //         Wiki.findOne({ where: {id: this.wiki.id }})
  //         .then((wiki) => {
  //           expect(wiki.title).toBe('Carver, OR');
  //           done();
  //         });
  //       });
  //     });
  //   });



  //   // END OF ADMIN SUITE
  // });


  // describe('premium user performing CRUD actions for Wiki', () => {
  //   beforeEach((done) => {
  //     request.get({
  //       url: 'http://localhost:3000/auth/fake',
  //       form: {
  //         role: 'premium'
  //       }
  //     },
  //       (err, res, body) => {
  //         done();
  //       }
  //     );
  //   });

  //   describe('GET /wikis', () => {
  //     it('should return a status code of 200, and all wikis', (done) => {
  //       request.get(base, (err, res, body) => {
  //         expect(res.statusCode).toBe(200);
  //         expect(err).toBeNull();
  //         expect(body).toContain('Wikis');
  //         expect(body).toContain('Carver');
  //         done();
  //       });
  //     });
  //   });
    
  //   describe('GET /wikis/new', () => {
  //     it('should render a new wiki form', (done) =>  {
  //       request.get(`${base}/new`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain('New Wiki');
  //         done();
  //       });
  //     });
  
  //   });
  
  //   describe('GET /wikis/:id', () => {
  //     it('should render a view with the selected wiki', (done) => {
  //       request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain('Carver');
  //         expect(body).toContain('The moss factory');
  //         done();
  //       });
  //     });
  //   });
  
  //   describe('GET /wikis/:id/edit', () => {
  //     it('should render a view with an edit topic form', (done) => {
  //       request.get(`${base}/${this.wiki.id}/edit`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain('Edit Wiki');
  //         expect(body).toContain('Carver');
  //         expect(body).toContain('The moss factory');
  //         done();
  //       });
  //     });
  //   });
  
  //   describe('POST /wikis/create', () => {
  //     it('should create a new wiki and redirect', (done) => {
  //       const options = {
  //         url:`${base}/create`,
  //         form: {
  //           title: 'Ozone',
  //           body: 'Lothlorien feel',
  //           private: false,
  //           userId: this.user.id
  //         }
  //       };
  
  //       request.post(options, (err, res, body) => {
  //         Wiki.findOne({where: {title: 'Ozone'}})
  //         .then((wiki) => {
  //           expect(res.statusCode).toBe(303);
  //           expect(wiki.title).toBe('Ozone');
  //           expect(wiki.body).toBe('Lothlorien feel');
  //           done();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           done();
  //         });
  //       })
  //     });
      
  //   });
  
  //   describe('POST /wikis/:id/destroy', () => {
  //     it('should delete the wiki with the associated ID', (done) => {
  //       Wiki.findAll()
  //       .then((wikis) => {
  //         const wikiCountBeforeDelete = wikis.length;
  //         expect(wikiCountBeforeDelete).toBe(1);
  
  //         request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
  //           Wiki.findAll()
  //           .then((wikis) => {
  //             expect(err).toBeNull();
  //             expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
  //             done();
  //           })
  //         });
  //       });
  //     });
  //   });
  
  //   describe('POST /wikis/:id/update', () => {
  //     it('should update the topic with the given values', (done) => {
  //       const options = {
  //         url: `${base}/${this.wiki.id}/update`,
  //         form: {
  //           title: 'Carver, OR',
  //           body: 'Twilight boulders'
  //         }
  //       };
  
  //       request.post(options, (err, res, body) => {
  //         expect(err).toBeNull();
  //         Wiki.findOne({ where: {id: this.wiki.id }})
  //         .then((wiki) => {
  //           expect(wiki.title).toBe('Carver, OR');
  //           done();
  //         });
  //       });
  //     });
  //   });


  //   // END OF PREMIUM SUITE
  // });

  describe('standard user performing CRUD actions on Wiki', () => {
    beforeEach((done) => {
      request.get({
        url: 'http://localhost:3000/auth/fake',
        form: {
          role: 'standard'
        }
      },
        (err, res, body) => {
          done();
        }
      );
    });

    describe('GET /wikis', () => {
      it('should return a status code of 200, and all wikis', (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain('Wikis');
          expect(body).toContain('Carver');
          done();
        });
      });
    });
    
    describe('GET /wikis/new', () => {
      it('should render a new wiki form', (done) =>  {
        request.get(`${base}/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('New Wiki');
          done();
        });
      });
  
    });
  
    describe('GET /wikis/:id', () => {
      it('should render a view with the selected wiki', (done) => {
        request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Carver');
          expect(body).toContain('The moss factory');
          done();
        });
      });
    });
  
    describe('GET /wikis/:id/edit', () => {
      it('should render a view with an edit topic form', (done) => {
        request.get(`${base}/${this.wiki.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Edit Wiki');
          expect(body).toContain('Carver');
          expect(body).toContain('The moss factory');
          done();
        });
      });
    });
  
    describe('POST /wikis/create', () => {
      it('should create a new wiki and redirect', (done) => {
        const options = {
          url:`${base}/create`,
          form: {
            title: 'Ozone',
            body: 'Lothlorien feel',
            private: false,
            userId: this.user.id
          }
        };
  
        request.post(options, (err, res, body) => {
          Wiki.findOne({where: {title: 'Ozone'}})
          .then((wiki) => {
            expect(res.statusCode).toBe(303);
            expect(wiki.title).toBe('Ozone');
            expect(wiki.body).toBe('Lothlorien feel');
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        })
      });
      
    });
  
    describe('POST /wikis/:id/destroy', () => {
      it('should delete the wiki with the associated ID', (done) => {
        Wiki.findAll()
        .then((wikis) => {
          const wikiCountBeforeDelete = wikis.length;
          expect(wikiCountBeforeDelete).toBe(1);
  
          request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
            Wiki.findAll()
            .then((wikis) => {
              expect(err).toBeNull();
              expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
              done();
            })
          });
        });
      });
    });
  
    describe('POST /wikis/:id/update', () => {
      it('should update the topic with the given values', (done) => {
        const options = {
          url: `${base}/${this.wiki.id}/update`,
          form: {
            title: 'Carver, OR',
            body: 'Twilight boulders'
          }
        };
  
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Wiki.findOne({ where: {id: this.wiki.id }})
          .then((wiki) => {
            expect(wiki.title).toBe('Carver, OR');
            done();
          });
        });
      });
    });


    // END OF STANDARD SUITE
  });


  describe('guest performing CRUD action on Wiki', () => {
    beforeEach((done) => {
      request.get({
        url: 'http://localhost:300/auth/fake',
        form: {
          role: 0
        }
      },
        (err, res, body) => {
          done();
        }
      );
    });

    describe('GET /wikis', () => {
      it('should return a status code of 200, and all wikis', (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain('Wikis');
          expect(body).toContain('Carver');
          done();
        });
      });
    });
    
    describe('GET /wikis/new', () => {
      it('should redirect to wiki/index', (done) =>  {
        request.get(`${base}/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Wikis');
          done();
        });
      });
  
    });
  
    describe('GET /wikis/:id', () => {
      it('should render a view with the selected wiki', (done) => {
        request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Carver');
          expect(body).toContain('The moss factory');
          done();
        });
      });
    });
  
    describe('GET /wikis/:id/edit', () => {
      it('should redirect to wiki/show', (done) => {
        request.get(`${base}/${this.wiki.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).not.toContain('Edit Wiki');
          expect(body).toContain('Carver');
          expect(body).toContain('The moss factory');
          done();
        });
      });
    });
  
    describe('POST /wikis/create', () => {
      it('should not create a new wiki', (done) => {
        const options = {
          url:`${base}/create`,
          form: {
            title: 'Ozone',
            body: 'Lothlorien feel',
            private: false,
            userId: this.user.id
          }
        };
  
        request.post(options, (err, res, body) => {
          Wiki.findOne({where: {title: 'Ozone'}})
          .then((wiki) => {
            expect(wiki.length).toBe(0);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        })
      });
      
    });
  
    describe('POST /wikis/:id/destroy', () => {
      it('should not delete the wiki with the associated ID', (done) => {
        Wiki.findAll()
        .then((wikis) => {
          const wikiCountBeforeDelete = wikis.length;
          expect(wikiCountBeforeDelete).toBe(1);
  
          request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
            Wiki.findAll()
            .then((wikis) => {
              expect(err).toBeNull();
              expect(wikis.length).toBe(wikiCountBeforeDelete);
              done();
            })
          });
        });
      });
    });
  
    describe('POST /wikis/:id/update', () => {
      it('should not update the topic with the given values', (done) => {
        const options = {
          url: `${base}/${this.wiki.id}/update`,
          form: {
            title: 'Carver, OR',
            body: 'Twilight boulders'
          }
        };
  
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Wiki.findOne({ where: {id: this.wiki.id }})
          .then((wiki) => {
            expect(wiki.title).toBe('Carver');
            done();
          });
        });
      });
    });

    // END OF GUEST SUITE
  });


  // describe('GET /wikis', () => {
  //   it('should return a status code of 200, and all wikis', (done) => {
  //     request.get(base, (err, res, body) => {
  //       expect(res.statusCode).toBe(200);
  //       expect(err).toBeNull();
  //       expect(body).toContain('Wikis');
  //       expect(body).toContain('Carver');
  //       done();
  //     });
  //   });
  // });
  
  // describe('GET /wikis/new', () => {
  //   it('should render a new wiki form', (done) =>  {
  //     request.get(`${base}/new`, (err, res, body) => {
  //       expect(err).toBeNull();
  //       expect(body).toContain('New Wiki');
  //       done();
  //     });
  //   });

  // });

  // describe('GET /wikis/:id', () => {
  //   it('should render a view with the selected wiki', (done) => {
  //     request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
  //       expect(err).toBeNull();
  //       expect(body).toContain('Carver');
  //       expect(body).toContain('The moss factory');
  //       done();
  //     });
  //   });
  // });

  // describe('GET /wikis/:id/edit', () => {
  //   it('should render a view with an edit topic form', (done) => {
  //     request.get(`${base}/${this.wiki.id}/edit`, (err, res, body) => {
  //       expect(err).toBeNull();
  //       expect(body).toContain('Edit Wiki');
  //       expect(body).toContain('Carver');
  //       expect(body).toContain('The moss factory');
  //       done();
  //     });
  //   });
  // });

  // describe('POST /wikis/create', () => {
  //   it('should create a new wiki and redirect', (done) => {
  //     const options = {
  //       url:`${base}/create`,
  //       form: {
  //         title: 'Ozone',
  //         body: 'Lothlorien feel',
  //         private: false,
  //         userId: this.user.id
  //       }
  //     };

  //     request.post(options, (err, res, body) => {
  //       Wiki.findOne({where: {title: 'Ozone'}})
  //       .then((wiki) => {
  //         expect(res.statusCode).toBe(303);
  //         expect(wiki.title).toBe('Ozone');
  //         expect(wiki.body).toBe('Lothlorien feel');
  //         done();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         done();
  //       });
  //     })
  //   });
    
  // });

  // describe('POST /wikis/:id/destroy', () => {
  //   it('should delete the wiki with the associated ID', (done) => {
  //     Wiki.findAll()
  //     .then((wikis) => {
  //       const wikiCountBeforeDelete = wikis.length;
  //       expect(wikiCountBeforeDelete).toBe(1);

  //       request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
  //         Wiki.findAll()
  //         .then((wikis) => {
  //           expect(err).toBeNull();
  //           expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
  //           done();
  //         })
  //       });
  //     });
  //   });
  // });

  // describe('POST /wikis/:id/update', () => {
  //   it('should update the topic with the given values', (done) => {
  //     const options = {
  //       url: `${base}/${this.wiki.id}/update`,
  //       form: {
  //         title: 'Carver, OR',
  //         body: 'Twilight boulders'
  //       }
  //     };

  //     request.post(options, (err, res, body) => {
  //       expect(err).toBeNull();
  //       Wiki.findOne({ where: {id: this.wiki.id }})
  //       .then((wiki) => {
  //         expect(wiki.title).toBe('Carver, OR');
  //         done();
  //       });
  //     });
  //   });
  // });

  // end of test suite
});