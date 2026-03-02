import { sequelize } from "../../config/db.postgres";

// Master Models
import { Country } from "./master/Country";
import { State } from "./master/State";
import { City } from "./master/City";
import { MotherTongue } from "./master/MotherTongue";
import { Religion } from "./master/Religion";
import { Caste } from "./master/Caste";
import { Height } from "./master/Height";
import { Education } from "./master/Education";
import { EmploymentType } from "./master/EmploymentType";
import { Occupation } from "./master/Occupation";
import { Currency } from "./master/Currency";
import { IncomeRange } from "./master/IncomeRange";

// Core Models
import { User } from "./User";
import { UserProfile } from "./UserProfile";
import { UserPreference } from "./UserPreference";
import { UserPhoto } from "./UserPhoto";
import { UserDraft } from "./UserDraft";
import { FamilyDetails } from "./FamilyDetails";
import { HoroscopeDetails } from "./HoroscopeDetails";
import { LocationLifestyle } from "./LocationLifestyle";
import { EducationCareer } from "./EducationCareer";
import { Badge } from "./Badge";

// Action Models
import { Interest } from "./Interest";
import { Match } from "./Match";
import { Message } from "./Message";
import { Plan } from "./Plan";
import { Subscription } from "./Subscription";
import { Payment } from "./Payment";
import { Waitlist } from "./Waitlist";

// Moderation
import { Block, Report } from "./Moderation";
import { SuccessStory } from "./SuccessStory";

// Associations
UserProfile.hasOne(FamilyDetails, { foreignKey: "userProfileId" });
FamilyDetails.belongsTo(UserProfile, { foreignKey: "userProfileId" });

UserProfile.hasOne(HoroscopeDetails, { foreignKey: "userProfileId" });
HoroscopeDetails.belongsTo(UserProfile, { foreignKey: "userProfileId" });

UserProfile.hasOne(LocationLifestyle, { foreignKey: "userProfileId" });
LocationLifestyle.belongsTo(UserProfile, { foreignKey: "userProfileId" });

UserProfile.hasOne(EducationCareer, { foreignKey: "userProfileId" });
EducationCareer.belongsTo(UserProfile, { foreignKey: "userProfileId" });

UserProfile.hasOne(Badge, { foreignKey: "userProfileId" });
Badge.belongsTo(UserProfile, { foreignKey: "userProfileId" });

export {
  sequelize,
  Country,
  State,
  City,
  MotherTongue,
  Religion,
  Caste,
  Height,
  Education,
  EmploymentType,
  Occupation,
  Currency,
  IncomeRange,
  User,
  UserProfile,
  UserPreference,
  UserPhoto,
  UserDraft,
  FamilyDetails,
  HoroscopeDetails,
  LocationLifestyle,
  EducationCareer,
  Badge,
  Interest,
  Match,
  Message,
  Plan,
  Subscription,
  Payment,
  Block,
  Report,
  SuccessStory,
  Waitlist,
};
