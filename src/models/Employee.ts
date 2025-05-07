import mongoose, { Document, mongo, Types } from "mongoose";

interface IEmployeeDocument extends Document {
  firstName: string;
  lastName: string;
  prefName: string | null;
  jobTitle: string;
  department: string;
  directReports: Types.ObjectId[];
  division: string | null;
  email: string;
  location: string;
  imgUrl?: string;
  reportsTo: Types.ObjectId | null;
  workPhone: string | null;
  ext: string | null;
  personalPhone: string | null;
  id: number;
  linkedInUrl: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  timeOff: string | null;
  timeOffIcon: string | null;
  skype: string | null;
  pinterest: string | null;
  pronouns: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new mongoose.Schema<IEmployeeDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    prefName: { type: String, default: null },
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    directReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    division: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    imgUrl: { type: String },
    reportsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    workPhone: { type: String, default: null },
    ext: { type: String, default: null },
    personalPhone: { type: String, default: null },
    id: { type: Number, required: true, unique: true },
    linkedInUrl: { type: String, default: null },
    twitterUrl: { type: String, default: null },
    facebookUrl: { type: String, default: null },
    instagramUrl: { type: String, default: null },
    timeOff: { type: String, default: null },
    timeOffIcon: { type: String, default: null },
    skype: { type: String, default: null },
    pinterest: { type: String, default: null },
    pronouns: { type: String, default: null },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("employees", employeeSchema);
