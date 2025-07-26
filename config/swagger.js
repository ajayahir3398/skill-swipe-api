const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Skill Swipe API',
      version: '1.0.0',
      description: 'A RESTful API for skill sharing and matching platform',
      contact: {
        name: 'API Support',
        email: 'support@skillswipe.com'
      }
    },
    servers: [
      {
        url: 'https://skill-swipe-api-o7ci.onrender.com',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'User name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            bio: {
              type: 'string',
              description: 'User bio'
            },
            avatar: {
              type: 'string',
              description: 'Profile image URL'
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
                timezone: { type: 'string' }
              }
            },
            profession: {
              type: 'string',
              description: 'User profession'
            },
            company: {
              type: 'string',
              description: 'User company'
            },
            experienceLevel: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced', 'expert'],
              description: 'Experience level'
            },
            yearsOfExperience: {
              type: 'number',
              description: 'Years of experience'
            },
            skillsOffered: {
              type: 'array',
              items: { type: 'string' },
              description: 'Skills the user can offer'
            },
            skillsNeeded: {
              type: 'array',
              items: { type: 'string' },
              description: 'Skills the user needs'
            },
            availability: {
              type: 'string',
              enum: ['full-time', 'part-time', 'freelance', 'weekends-only', 'evenings-only'],
              description: 'Availability status'
            },
            preferredMeetingType: {
              type: 'string',
              enum: ['in-person', 'video-call', 'phone', 'chat', 'any'],
              description: 'Preferred meeting type'
            },
            phone: {
              type: 'string',
              description: 'Phone number'
            },
            website: {
              type: 'string',
              description: 'Personal website'
            },
            linkedin: {
              type: 'string',
              description: 'LinkedIn profile'
            },
            github: {
              type: 'string',
              description: 'GitHub profile'
            },
            interests: {
              type: 'array',
              items: { type: 'string' },
              description: 'User interests'
            },
            languages: {
              type: 'array',
              items: { type: 'string' },
              description: 'Languages spoken'
            },
            isProfileComplete: {
              type: 'boolean',
              description: 'Whether profile is complete'
            },
            isPublicProfile: {
              type: 'boolean',
              description: 'Whether profile is public'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              description: 'User password'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              description: 'User password'
            }
          }
        },
        ProfileUpdateRequest: {
          type: 'object',
          properties: {
            bio: {
              type: 'string',
              maxLength: 500,
              description: 'User bio'
            },
            avatar: {
              type: 'string',
              description: 'Profile image URL'
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'Date of birth'
            },
            gender: {
              type: 'string',
              enum: ['male', 'female', 'other', 'prefer-not-to-say'],
              description: 'Gender'
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
                timezone: { type: 'string' }
              }
            },
            profession: {
              type: 'string',
              description: 'User profession'
            },
            company: {
              type: 'string',
              description: 'User company'
            },
            experienceLevel: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced', 'expert'],
              description: 'Experience level'
            },
            yearsOfExperience: {
              type: 'number',
              minimum: 0,
              description: 'Years of experience'
            },
            skillsOffered: {
              type: 'array',
              items: { type: 'string' },
              description: 'Skills the user can offer'
            },
            skillsNeeded: {
              type: 'array',
              items: { type: 'string' },
              description: 'Skills the user needs'
            },
            availability: {
              type: 'string',
              enum: ['full-time', 'part-time', 'freelance', 'weekends-only', 'evenings-only'],
              description: 'Availability status'
            },
            preferredMeetingType: {
              type: 'string',
              enum: ['in-person', 'video-call', 'phone', 'chat', 'any'],
              description: 'Preferred meeting type'
            },
            phone: {
              type: 'string',
              description: 'Phone number'
            },
            website: {
              type: 'string',
              description: 'Personal website'
            },
            linkedin: {
              type: 'string',
              description: 'LinkedIn profile'
            },
            github: {
              type: 'string',
              description: 'GitHub profile'
            },
            isPublicProfile: {
              type: 'boolean',
              description: 'Whether profile is public'
            },
            notificationsEnabled: {
              type: 'boolean',
              description: 'Whether notifications are enabled'
            },
            interests: {
              type: 'array',
              items: { type: 'string' },
              description: 'User interests'
            },
            languages: {
              type: 'array',
              items: { type: 'string' },
              description: 'Languages spoken'
            },
            certifications: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  issuer: { type: 'string' },
                  dateObtained: { type: 'string', format: 'date' },
                  expiryDate: { type: 'string', format: 'date' }
                }
              },
              description: 'User certifications'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        Message: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'A message describing the result.'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API routes and controllers
};

const specs = swaggerJsdoc(options);

module.exports = specs; 