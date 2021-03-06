const bcrypt = require('bcrypt');
const Mongoose = require('mongoose');
// const atlasPlugin = require('mongoose-atlas-search');

const UserSchema = Mongoose.Schema(
   {
      names: {
         first_name: {
            type: String,
            trim: true,
            required: [true, 'your first name'],
         },

         middle_name: {
            type: String,
            required: [true, 'your middle name'],
            trim: true,
         },

         last_name: {
            type: String,
            trim: true,
            required: [true, 'your last name'],
         },

         user_name: {
            type: String,
            trim: true,
            required: [true, 'your username'],
            unique: true,
         },
      },

      googleId: {
         type: String,
         select: false,
      },

      // profile document

      phone: {
         type: String,
      },

      about: {
         type: String,
      },

      joinedAt: {
         type: Date,
         default: Date.now(),
      },

      email: {
         type: String,
         trim: true,
         required: [true, 'your email address'],
         unique: true,
      },

      verified: {
         type: Boolean,
         default: false,
      },

      profilePic: {
         type: String,
         default: 'avatar.jpg',
      },

      coverPhoto: {
         type: String,
      },

      location: {
         type: String,
      },

      password: {
         type: String,
         select: false,
      },

      passwordResetToken: {
         type: String,
         select: false,
      },

      passwordResetTokenExpires: {
         type: String,
         select: false,
      },

      //documents with that takes Boolean
      active: {
         type: Boolean,
         default: true,
      },

      role: {
         type: String,
         enum: ['user', 'admin'],
         select: false,
         default: 'user',
      },

      friends: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'users',
            is_a_Friend: {
               type: Boolean,
               default: true,
            },
         },
      ],

      notifications: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'notifications',
         },
      ],

      calls: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'calls',
         },
      ],

      posts: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'Post',
         },
      ],

      gender: {
         type: String,
         enum: ['male', 'female'],
      },

      videoCalls: [
         {
            type: Mongoose.Schema.ObjectId,
            select: false,
            ref: 'Video',
         },
      ],

      voiceCalls: [
         {
            type: Mongoose.Schema.ObjectId,
            select: false,
            ref: 'Audio',
         },
      ],
   },

   {
      timestamps: true,

      toObject: {
         virtuals: true,
      },

      toJSON: {
         virtuals: true,
      },
   }
);

UserSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      this.passwordConfirm = undefined;
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

UserSchema.methods.comparePassword = async function (
   userPassword,
   OriginalPassword
) {
   return await bcrypt.compare(userPassword, OriginalPassword);
};
const userModel = Mongoose.model('User', UserSchema);

module.exports = userModel;
