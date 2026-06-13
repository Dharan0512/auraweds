--
-- PostgreSQL database dump
--

\restrict wPDc54N6kQllXFkBSduzePMPHb75W8Uk36ahefoVwmqzeYXg4MczPYUvSt6MVlT

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-05-30 23:32:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1156 (class 1247 OID 117609)
-- Name: enum_coupons_discountType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_coupons_discountType" AS ENUM (
    'percentage',
    'fixed'
);


ALTER TYPE public."enum_coupons_discountType" OWNER TO postgres;

--
-- TOC entry 1132 (class 1247 OID 63891)
-- Name: enum_educations_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_educations_level AS ENUM (
    'SSLC',
    'HSC',
    'Diploma',
    'School',
    'UG',
    'PG',
    'Doctorate',
    'ITI',
    'Other'
);


ALTER TYPE public.enum_educations_level OWNER TO postgres;

--
-- TOC entry 1075 (class 1247 OID 19620)
-- Name: enum_family_details_familyStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_family_details_familyStatus" AS ENUM (
    'Middle Class',
    'Upper Middle Class',
    'Rich',
    'Affluent'
);


ALTER TYPE public."enum_family_details_familyStatus" OWNER TO postgres;

--
-- TOC entry 1072 (class 1247 OID 19612)
-- Name: enum_family_details_familyType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_family_details_familyType" AS ENUM (
    'Joint',
    'Nuclear',
    'Other'
);


ALTER TYPE public."enum_family_details_familyType" OWNER TO postgres;

--
-- TOC entry 1084 (class 1247 OID 19658)
-- Name: enum_horoscope_details_rahuKetuDhosham; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_horoscope_details_rahuKetuDhosham" AS ENUM (
    'Yes',
    'No',
    'Don''t Know'
);


ALTER TYPE public."enum_horoscope_details_rahuKetuDhosham" OWNER TO postgres;

--
-- TOC entry 1081 (class 1247 OID 19651)
-- Name: enum_horoscope_details_sevvaiDhosham; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_horoscope_details_sevvaiDhosham" AS ENUM (
    'Yes',
    'No',
    'Don''t Know'
);


ALTER TYPE public."enum_horoscope_details_sevvaiDhosham" OWNER TO postgres;

--
-- TOC entry 1003 (class 1247 OID 17413)
-- Name: enum_interests_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_interests_status AS ENUM (
    'pending',
    'accepted',
    'rejected',
    'PENDING',
    'ACCEPTED',
    'DECLINED',
    'WITHDRAWN',
    'EXPIRED',
    'BLOCKED'
);


ALTER TYPE public.enum_interests_status OWNER TO postgres;

--
-- TOC entry 1093 (class 1247 OID 19694)
-- Name: enum_location_lifestyle_diet; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_location_lifestyle_diet AS ENUM (
    'Veg',
    'Non-veg',
    'Eggetarian',
    'Vegan'
);


ALTER TYPE public.enum_location_lifestyle_diet OWNER TO postgres;

--
-- TOC entry 1096 (class 1247 OID 19704)
-- Name: enum_location_lifestyle_drink; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_location_lifestyle_drink AS ENUM (
    'Yes',
    'No',
    'Occasionally'
);


ALTER TYPE public.enum_location_lifestyle_drink OWNER TO postgres;

--
-- TOC entry 1102 (class 1247 OID 19720)
-- Name: enum_location_lifestyle_fitnessLevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_location_lifestyle_fitnessLevel" AS ENUM (
    'Regular',
    'Occasional',
    'Not at all'
);


ALTER TYPE public."enum_location_lifestyle_fitnessLevel" OWNER TO postgres;

--
-- TOC entry 1090 (class 1247 OID 19686)
-- Name: enum_location_lifestyle_relocatePreference; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_location_lifestyle_relocatePreference" AS ENUM (
    'Yes',
    'No',
    'Flexible'
);


ALTER TYPE public."enum_location_lifestyle_relocatePreference" OWNER TO postgres;

--
-- TOC entry 1099 (class 1247 OID 19712)
-- Name: enum_location_lifestyle_smoke; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_location_lifestyle_smoke AS ENUM (
    'Yes',
    'No',
    'Occasionally'
);


ALTER TYPE public.enum_location_lifestyle_smoke OWNER TO postgres;

--
-- TOC entry 1123 (class 1247 OID 58226)
-- Name: enum_notifications_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_notifications_type AS ENUM (
    'CALL_ATTEMPT',
    'CONNECTION_WISH',
    'INTEREST_RECEIVED',
    'INTEREST_ACCEPTED',
    'PROFILE_VIEW',
    'ADMIN_BROADCAST',
    'MARKETING_OFFER'
);


ALTER TYPE public.enum_notifications_type OWNER TO postgres;

--
-- TOC entry 1024 (class 1247 OID 17539)
-- Name: enum_payments_paymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_payments_paymentStatus" AS ENUM (
    'pending',
    'success',
    'failed'
);


ALTER TYPE public."enum_payments_paymentStatus" OWNER TO postgres;

--
-- TOC entry 1018 (class 1247 OID 17509)
-- Name: enum_subscriptions_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_subscriptions_status AS ENUM (
    'active',
    'expired',
    'cancelled',
    'cancelled_pending'
);


ALTER TYPE public.enum_subscriptions_status OWNER TO postgres;

--
-- TOC entry 1036 (class 1247 OID 17617)
-- Name: enum_success_stories_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_success_stories_status AS ENUM (
    'engagement',
    'married'
);


ALTER TYPE public.enum_success_stories_status OWNER TO postgres;

--
-- TOC entry 1153 (class 1247 OID 113964)
-- Name: enum_user_photos_approvalStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_photos_approvalStatus" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_user_photos_approvalStatus" OWNER TO postgres;

--
-- TOC entry 1057 (class 1247 OID 17690)
-- Name: enum_user_profiles_ambition; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_ambition AS ENUM (
    'High',
    'Moderate',
    'Low'
);


ALTER TYPE public.enum_user_profiles_ambition OWNER TO postgres;

--
-- TOC entry 1150 (class 1247 OID 113283)
-- Name: enum_user_profiles_approvalStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_approvalStatus" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_user_profiles_approvalStatus" OWNER TO postgres;

--
-- TOC entry 1063 (class 1247 OID 17706)
-- Name: enum_user_profiles_careerAfterMarriage; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_careerAfterMarriage" AS ENUM (
    'Yes',
    'No',
    'Flexible'
);


ALTER TYPE public."enum_user_profiles_careerAfterMarriage" OWNER TO postgres;

--
-- TOC entry 1060 (class 1247 OID 17698)
-- Name: enum_user_profiles_childrenPreference; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_childrenPreference" AS ENUM (
    'Yes',
    'No',
    'Flexible'
);


ALTER TYPE public."enum_user_profiles_childrenPreference" OWNER TO postgres;

--
-- TOC entry 1042 (class 1247 OID 17648)
-- Name: enum_user_profiles_diet; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_diet AS ENUM (
    'Veg',
    'Non-veg',
    'Eggetarian',
    'Vegan'
);


ALTER TYPE public.enum_user_profiles_diet OWNER TO postgres;

--
-- TOC entry 1045 (class 1247 OID 17658)
-- Name: enum_user_profiles_drink; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_drink AS ENUM (
    'Yes',
    'No',
    'Occasionally'
);


ALTER TYPE public.enum_user_profiles_drink OWNER TO postgres;

--
-- TOC entry 991 (class 1247 OID 17260)
-- Name: enum_user_profiles_familyStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_familyStatus" AS ENUM (
    'Middle Class',
    'Upper Middle Class',
    'Rich',
    'Affluent'
);


ALTER TYPE public."enum_user_profiles_familyStatus" OWNER TO postgres;

--
-- TOC entry 1051 (class 1247 OID 17674)
-- Name: enum_user_profiles_fitness; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_fitness AS ENUM (
    'Regular',
    'Occasional',
    'Not at all'
);


ALTER TYPE public.enum_user_profiles_fitness OWNER TO postgres;

--
-- TOC entry 988 (class 1247 OID 17250)
-- Name: enum_user_profiles_maritalStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_maritalStatus" AS ENUM (
    'Never Married',
    'Divorced',
    'Widowed',
    'Awaiting Divorce'
);


ALTER TYPE public."enum_user_profiles_maritalStatus" OWNER TO postgres;

--
-- TOC entry 985 (class 1247 OID 17244)
-- Name: enum_user_profiles_physicalStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_physicalStatus" AS ENUM (
    'Normal',
    'Physically Challenged'
);


ALTER TYPE public."enum_user_profiles_physicalStatus" OWNER TO postgres;

--
-- TOC entry 1117 (class 1247 OID 23225)
-- Name: enum_user_profiles_profileVisibility; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_user_profiles_profileVisibility" AS ENUM (
    'Public',
    'Members Only',
    'Hidden'
);


ALTER TYPE public."enum_user_profiles_profileVisibility" OWNER TO postgres;

--
-- TOC entry 1066 (class 1247 OID 17714)
-- Name: enum_user_profiles_relocation; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_relocation AS ENUM (
    'Yes',
    'No',
    'Flexible'
);


ALTER TYPE public.enum_user_profiles_relocation OWNER TO postgres;

--
-- TOC entry 1048 (class 1247 OID 17666)
-- Name: enum_user_profiles_smoke; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_smoke AS ENUM (
    'Yes',
    'No',
    'Occasionally'
);


ALTER TYPE public.enum_user_profiles_smoke OWNER TO postgres;

--
-- TOC entry 1054 (class 1247 OID 17682)
-- Name: enum_user_profiles_spirituality; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_profiles_spirituality AS ENUM (
    'Very Spiritual',
    'Moderately Spiritual',
    'Not Spiritual'
);


ALTER TYPE public.enum_user_profiles_spirituality OWNER TO postgres;

--
-- TOC entry 973 (class 1247 OID 17187)
-- Name: enum_users_createdFor; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_users_createdFor" AS ENUM (
    'Myself',
    'Daughter',
    'Son',
    'Sister',
    'Brother',
    'Relative',
    'Friend',
    'Self',
    'Parent',
    'Guardian'
);


ALTER TYPE public."enum_users_createdFor" OWNER TO postgres;

--
-- TOC entry 976 (class 1247 OID 17208)
-- Name: enum_users_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_gender AS ENUM (
    'Male',
    'Female',
    'Other'
);


ALTER TYPE public.enum_users_gender OWNER TO postgres;

--
-- TOC entry 979 (class 1247 OID 17216)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 284 (class 1259 OID 19768)
-- Name: badges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badges (
    id integer NOT NULL,
    "userProfileId" integer NOT NULL,
    "mobileVerified" boolean DEFAULT false,
    "emailVerified" boolean DEFAULT false,
    "idVerified" boolean DEFAULT false,
    "adminApproved" boolean DEFAULT false,
    "premiumMember" boolean DEFAULT false,
    "horoscopeAvailable" boolean DEFAULT false,
    "highIntent" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.badges OWNER TO postgres;

--
-- TOC entry 283 (class 1259 OID 19767)
-- Name: badges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.badges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.badges_id_seq OWNER TO postgres;

--
-- TOC entry 7213 (class 0 OID 0)
-- Dependencies: 283
-- Name: badges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.badges_id_seq OWNED BY public.badges.id;


--
-- TOC entry 268 (class 1259 OID 17570)
-- Name: blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blocks (
    id integer NOT NULL,
    "blockerId" integer NOT NULL,
    "blockedId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.blocks OWNER TO postgres;

--
-- TOC entry 267 (class 1259 OID 17569)
-- Name: blocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blocks_id_seq OWNER TO postgres;

--
-- TOC entry 7214 (class 0 OID 0)
-- Dependencies: 267
-- Name: blocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blocks_id_seq OWNED BY public.blocks.id;


--
-- TOC entry 234 (class 1259 OID 17084)
-- Name: castes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.castes (
    id integer NOT NULL,
    "religionId" integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.castes OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17083)
-- Name: castes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.castes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.castes_id_seq OWNER TO postgres;

--
-- TOC entry 7215 (class 0 OID 0)
-- Dependencies: 233
-- Name: castes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.castes_id_seq OWNED BY public.castes.id;


--
-- TOC entry 228 (class 1259 OID 17048)
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    "stateId" integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17047)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cities_id_seq OWNER TO postgres;

--
-- TOC entry 7216 (class 0 OID 0)
-- Dependencies: 227
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- TOC entry 224 (class 1259 OID 17020)
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "isoCode" character varying(10) NOT NULL,
    "phoneCode" character varying(10) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17019)
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.countries_id_seq OWNER TO postgres;

--
-- TOC entry 7217 (class 0 OID 0)
-- Dependencies: 223
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- TOC entry 304 (class 1259 OID 117614)
-- Name: coupons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupons (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    "discountType" public."enum_coupons_discountType" NOT NULL,
    "discountValue" numeric(10,2) NOT NULL,
    "expiryDate" timestamp with time zone,
    "maxUsage" integer,
    "currentUsage" integer DEFAULT 0,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.coupons OWNER TO postgres;

--
-- TOC entry 303 (class 1259 OID 117613)
-- Name: coupons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coupons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coupons_id_seq OWNER TO postgres;

--
-- TOC entry 7218 (class 0 OID 0)
-- Dependencies: 303
-- Name: coupons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coupons_id_seq OWNED BY public.coupons.id;


--
-- TOC entry 244 (class 1259 OID 17158)
-- Name: currencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.currencies (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    symbol character varying(10) NOT NULL,
    code character varying(10) NOT NULL
);


ALTER TABLE public.currencies OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 17157)
-- Name: currencies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.currencies_id_seq OWNER TO postgres;

--
-- TOC entry 7219 (class 0 OID 0)
-- Dependencies: 243
-- Name: currencies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.currencies_id_seq OWNED BY public.currencies.id;


--
-- TOC entry 282 (class 1259 OID 19748)
-- Name: education_career; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.education_career (
    id integer NOT NULL,
    "userProfileId" integer NOT NULL,
    "highestEducation" character varying(255),
    "fieldOfStudy" character varying(255),
    college character varying(255),
    "employmentType" character varying(100),
    "companyName" character varying(255),
    designation character varying(150),
    "incomeRange" character varying(100),
    "exactIncome" bigint,
    assets jsonb,
    "careerPlanAfterMarriage" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.education_career OWNER TO postgres;

--
-- TOC entry 281 (class 1259 OID 19747)
-- Name: education_career_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.education_career_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.education_career_id_seq OWNER TO postgres;

--
-- TOC entry 7220 (class 0 OID 0)
-- Dependencies: 281
-- Name: education_career_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.education_career_id_seq OWNED BY public.education_career.id;


--
-- TOC entry 238 (class 1259 OID 17122)
-- Name: educations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educations (
    id integer NOT NULL,
    level public.enum_educations_level NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.educations OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17121)
-- Name: educations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.educations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.educations_id_seq OWNER TO postgres;

--
-- TOC entry 7221 (class 0 OID 0)
-- Dependencies: 237
-- Name: educations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.educations_id_seq OWNED BY public.educations.id;


--
-- TOC entry 240 (class 1259 OID 17133)
-- Name: employment_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employment_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.employment_types OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17132)
-- Name: employment_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employment_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employment_types_id_seq OWNER TO postgres;

--
-- TOC entry 7222 (class 0 OID 0)
-- Dependencies: 239
-- Name: employment_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employment_types_id_seq OWNED BY public.employment_types.id;


--
-- TOC entry 276 (class 1259 OID 19630)
-- Name: family_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.family_details (
    id integer NOT NULL,
    "userProfileId" integer NOT NULL,
    "fatherName" character varying(100),
    "fatherOccupation" character varying(100),
    "motherName" character varying(100),
    "motherOccupation" character varying(100),
    "familyType" public."enum_family_details_familyType",
    "familyStatus" public."enum_family_details_familyStatus",
    "siblingsCount" integer DEFAULT 0,
    "ownHouse" boolean,
    "nativeDistrict" character varying(100),
    "familyLocation" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.family_details OWNER TO postgres;

--
-- TOC entry 275 (class 1259 OID 19629)
-- Name: family_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.family_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.family_details_id_seq OWNER TO postgres;

--
-- TOC entry 7223 (class 0 OID 0)
-- Dependencies: 275
-- Name: family_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.family_details_id_seq OWNED BY public.family_details.id;


--
-- TOC entry 300 (class 1259 OID 63947)
-- Name: gothrams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gothrams (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.gothrams OWNER TO postgres;

--
-- TOC entry 299 (class 1259 OID 63946)
-- Name: gothrams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gothrams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gothrams_id_seq OWNER TO postgres;

--
-- TOC entry 7224 (class 0 OID 0)
-- Dependencies: 299
-- Name: gothrams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gothrams_id_seq OWNED BY public.gothrams.id;


--
-- TOC entry 236 (class 1259 OID 17100)
-- Name: heights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heights (
    id integer NOT NULL,
    "cmValue" integer NOT NULL,
    "displayLabel" character varying(50) NOT NULL
);


ALTER TABLE public.heights OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17099)
-- Name: heights_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.heights_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.heights_id_seq OWNER TO postgres;

--
-- TOC entry 7225 (class 0 OID 0)
-- Dependencies: 235
-- Name: heights_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.heights_id_seq OWNED BY public.heights.id;


--
-- TOC entry 278 (class 1259 OID 19666)
-- Name: horoscope_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horoscope_details (
    id integer NOT NULL,
    "userProfileId" integer NOT NULL,
    star character varying(100),
    rasi character varying(100),
    laknam character varying(100),
    gothram character varying(100),
    "sevvaiDhosham" public."enum_horoscope_details_sevvaiDhosham",
    "rahuKetuDhosham" public."enum_horoscope_details_rahuKetuDhosham",
    "birthTime" character varying(50),
    "birthPlace" character varying(100),
    "horoscopePdfUrl" character varying(255),
    "horoscopeImageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "starId" integer,
    "rasiId" integer,
    "laknamId" integer,
    "gothramId" integer,
    "birthCityId" integer
);


ALTER TABLE public.horoscope_details OWNER TO postgres;

--
-- TOC entry 277 (class 1259 OID 19665)
-- Name: horoscope_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horoscope_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.horoscope_details_id_seq OWNER TO postgres;

--
-- TOC entry 7226 (class 0 OID 0)
-- Dependencies: 277
-- Name: horoscope_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.horoscope_details_id_seq OWNED BY public.horoscope_details.id;


--
-- TOC entry 246 (class 1259 OID 17169)
-- Name: income_ranges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.income_ranges (
    id integer NOT NULL,
    "currencyId" integer NOT NULL,
    "minValue" bigint NOT NULL,
    "maxValue" bigint NOT NULL,
    "displayLabel" character varying(100) NOT NULL,
    "sortOrder" integer DEFAULT 0
);


ALTER TABLE public.income_ranges OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 17168)
-- Name: income_ranges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.income_ranges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.income_ranges_id_seq OWNER TO postgres;

--
-- TOC entry 7227 (class 0 OID 0)
-- Dependencies: 245
-- Name: income_ranges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.income_ranges_id_seq OWNED BY public.income_ranges.id;


--
-- TOC entry 256 (class 1259 OID 17420)
-- Name: interests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interests (
    id integer NOT NULL,
    "senderId" integer NOT NULL,
    "receiverId" integer NOT NULL,
    status public.enum_interests_status DEFAULT 'PENDING'::public.enum_interests_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "viewedAt" timestamp with time zone
);


ALTER TABLE public.interests OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 17419)
-- Name: interests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interests_id_seq OWNER TO postgres;

--
-- TOC entry 7228 (class 0 OID 0)
-- Dependencies: 255
-- Name: interests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interests_id_seq OWNED BY public.interests.id;


--
-- TOC entry 298 (class 1259 OID 63935)
-- Name: laknams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laknams (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.laknams OWNER TO postgres;

--
-- TOC entry 297 (class 1259 OID 63934)
-- Name: laknams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.laknams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.laknams_id_seq OWNER TO postgres;

--
-- TOC entry 7229 (class 0 OID 0)
-- Dependencies: 297
-- Name: laknams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.laknams_id_seq OWNED BY public.laknams.id;


--
-- TOC entry 280 (class 1259 OID 19728)
-- Name: location_lifestyle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location_lifestyle (
    id integer NOT NULL,
    "userProfileId" integer NOT NULL,
    country character varying(100),
    state character varying(100),
    city character varying(100),
    "relocatePreference" public."enum_location_lifestyle_relocatePreference",
    diet public.enum_location_lifestyle_diet,
    drink public.enum_location_lifestyle_drink,
    smoke public.enum_location_lifestyle_smoke,
    "fitnessLevel" public."enum_location_lifestyle_fitnessLevel",
    languages jsonb,
    hobbies jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    ambition integer,
    "familyOrientation" integer,
    "emotionalStability" integer,
    "communicationStyle" integer,
    "spiritualInclination" integer
);


ALTER TABLE public.location_lifestyle OWNER TO postgres;

--
-- TOC entry 279 (class 1259 OID 19727)
-- Name: location_lifestyle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_lifestyle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_lifestyle_id_seq OWNER TO postgres;

--
-- TOC entry 7230 (class 0 OID 0)
-- Dependencies: 279
-- Name: location_lifestyle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_lifestyle_id_seq OWNED BY public.location_lifestyle.id;


--
-- TOC entry 258 (class 1259 OID 17446)
-- Name: matches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matches (
    id integer NOT NULL,
    "userId1" integer NOT NULL,
    "userId2" integer NOT NULL,
    "compatibilityScore" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.matches OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 17445)
-- Name: matches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.matches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.matches_id_seq OWNER TO postgres;

--
-- TOC entry 7231 (class 0 OID 0)
-- Dependencies: 257
-- Name: matches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.matches_id_seq OWNED BY public.matches.id;


--
-- TOC entry 260 (class 1259 OID 17469)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    "senderId" integer NOT NULL,
    "receiverId" integer NOT NULL,
    content text NOT NULL,
    "isRead" boolean DEFAULT false,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 17468)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 7232 (class 0 OID 0)
-- Dependencies: 259
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 230 (class 1259 OID 17064)
-- Name: mother_tongues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mother_tongues (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    code character varying(10),
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.mother_tongues OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17063)
-- Name: mother_tongues_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mother_tongues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mother_tongues_id_seq OWNER TO postgres;

--
-- TOC entry 7233 (class 0 OID 0)
-- Dependencies: 229
-- Name: mother_tongues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mother_tongues_id_seq OWNED BY public.mother_tongues.id;


--
-- TOC entry 290 (class 1259 OID 58238)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "senderId" integer,
    type public.enum_notifications_type NOT NULL,
    message character varying(255) NOT NULL,
    "isRead" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 289 (class 1259 OID 58237)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- TOC entry 7234 (class 0 OID 0)
-- Dependencies: 289
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 242 (class 1259 OID 17142)
-- Name: occupations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.occupations (
    id integer NOT NULL,
    "employmentTypeId" integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.occupations OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17141)
-- Name: occupations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.occupations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.occupations_id_seq OWNER TO postgres;

--
-- TOC entry 7235 (class 0 OID 0)
-- Dependencies: 241
-- Name: occupations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.occupations_id_seq OWNED BY public.occupations.id;


--
-- TOC entry 252 (class 1259 OID 17349)
-- Name: partner_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partner_preferences (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "minAge" integer DEFAULT 18,
    "maxAge" integer DEFAULT 40,
    "minHeightCm" integer,
    "maxHeightCm" integer,
    "maritalStatus" character varying(255),
    "religionId" integer,
    "casteId" integer,
    "educationId" integer,
    "countryId" integer,
    "stateId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.partner_preferences OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 17348)
-- Name: partner_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partner_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partner_preferences_id_seq OWNER TO postgres;

--
-- TOC entry 7236 (class 0 OID 0)
-- Dependencies: 251
-- Name: partner_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.partner_preferences_id_seq OWNED BY public.partner_preferences.id;


--
-- TOC entry 266 (class 1259 OID 17546)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "subscriptionId" integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency character varying(10) DEFAULT 'INR'::character varying,
    "paymentStatus" public."enum_payments_paymentStatus" DEFAULT 'pending'::public."enum_payments_paymentStatus",
    "providerTransactionId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 17545)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 7237 (class 0 OID 0)
-- Dependencies: 265
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 302 (class 1259 OID 87868)
-- Name: phone_view_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phone_view_logs (
    id integer NOT NULL,
    "viewerId" integer NOT NULL,
    "viewedUserId" integer NOT NULL,
    "viewedAt" timestamp with time zone
);


ALTER TABLE public.phone_view_logs OWNER TO postgres;

--
-- TOC entry 301 (class 1259 OID 87867)
-- Name: phone_view_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phone_view_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.phone_view_logs_id_seq OWNER TO postgres;

--
-- TOC entry 7238 (class 0 OID 0)
-- Dependencies: 301
-- Name: phone_view_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phone_view_logs_id_seq OWNED BY public.phone_view_logs.id;


--
-- TOC entry 262 (class 1259 OID 17495)
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    "monthlyPrice" numeric(10,2) NOT NULL,
    features json,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 17494)
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plans_id_seq OWNER TO postgres;

--
-- TOC entry 7239 (class 0 OID 0)
-- Dependencies: 261
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- TOC entry 292 (class 1259 OID 58262)
-- Name: profile_views; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_views (
    id integer NOT NULL,
    "viewerId" integer NOT NULL,
    "viewedId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.profile_views OWNER TO postgres;

--
-- TOC entry 291 (class 1259 OID 58261)
-- Name: profile_views_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_views_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_views_id_seq OWNER TO postgres;

--
-- TOC entry 7240 (class 0 OID 0)
-- Dependencies: 291
-- Name: profile_views_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_views_id_seq OWNED BY public.profile_views.id;


--
-- TOC entry 296 (class 1259 OID 63923)
-- Name: rasis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rasis (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.rasis OWNER TO postgres;

--
-- TOC entry 295 (class 1259 OID 63922)
-- Name: rasis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rasis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rasis_id_seq OWNER TO postgres;

--
-- TOC entry 7241 (class 0 OID 0)
-- Dependencies: 295
-- Name: rasis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rasis_id_seq OWNED BY public.rasis.id;


--
-- TOC entry 232 (class 1259 OID 17074)
-- Name: religions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.religions (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.religions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17073)
-- Name: religions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.religions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.religions_id_seq OWNER TO postgres;

--
-- TOC entry 7242 (class 0 OID 0)
-- Dependencies: 231
-- Name: religions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.religions_id_seq OWNED BY public.religions.id;


--
-- TOC entry 270 (class 1259 OID 17592)
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    "reporterId" integer NOT NULL,
    "reportedId" integer NOT NULL,
    reason text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- TOC entry 269 (class 1259 OID 17591)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO postgres;

--
-- TOC entry 7243 (class 0 OID 0)
-- Dependencies: 269
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- TOC entry 294 (class 1259 OID 63911)
-- Name: stars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stars (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.stars OWNER TO postgres;

--
-- TOC entry 293 (class 1259 OID 63910)
-- Name: stars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stars_id_seq OWNER TO postgres;

--
-- TOC entry 7244 (class 0 OID 0)
-- Dependencies: 293
-- Name: stars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stars_id_seq OWNED BY public.stars.id;


--
-- TOC entry 226 (class 1259 OID 17032)
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.states (
    id integer NOT NULL,
    "countryId" integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActive" boolean DEFAULT true
);


ALTER TABLE public.states OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17031)
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.states_id_seq OWNER TO postgres;

--
-- TOC entry 7245 (class 0 OID 0)
-- Dependencies: 225
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- TOC entry 264 (class 1259 OID 17516)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "planId" integer NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone NOT NULL,
    status public.enum_subscriptions_status DEFAULT 'active'::public.enum_subscriptions_status,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 17515)
-- Name: subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscriptions_id_seq OWNER TO postgres;

--
-- TOC entry 7246 (class 0 OID 0)
-- Dependencies: 263
-- Name: subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscriptions_id_seq OWNED BY public.subscriptions.id;


--
-- TOC entry 272 (class 1259 OID 17622)
-- Name: success_stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.success_stories (
    id integer NOT NULL,
    "partner1Id" integer NOT NULL,
    "partner2Id" integer NOT NULL,
    status public.enum_success_stories_status NOT NULL,
    "storyText" text,
    "weddingDate" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.success_stories OWNER TO postgres;

--
-- TOC entry 271 (class 1259 OID 17621)
-- Name: success_stories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.success_stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.success_stories_id_seq OWNER TO postgres;

--
-- TOC entry 7247 (class 0 OID 0)
-- Dependencies: 271
-- Name: success_stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.success_stories_id_seq OWNED BY public.success_stories.id;


--
-- TOC entry 274 (class 1259 OID 18919)
-- Name: user_drafts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_drafts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "stepData" json DEFAULT '{}'::json NOT NULL,
    "lastStep" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.user_drafts OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 18918)
-- Name: user_drafts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_drafts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_drafts_id_seq OWNER TO postgres;

--
-- TOC entry 7248 (class 0 OID 0)
-- Dependencies: 273
-- Name: user_drafts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_drafts_id_seq OWNED BY public.user_drafts.id;


--
-- TOC entry 254 (class 1259 OID 17394)
-- Name: user_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_photos (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url character varying(255) NOT NULL,
    "isMain" boolean DEFAULT false,
    "order" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "approvalStatus" public."enum_user_photos_approvalStatus" DEFAULT 'pending'::public."enum_user_photos_approvalStatus"
);


ALTER TABLE public.user_photos OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 17393)
-- Name: user_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_photos_id_seq OWNER TO postgres;

--
-- TOC entry 7249 (class 0 OID 0)
-- Dependencies: 253
-- Name: user_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_photos_id_seq OWNED BY public.user_photos.id;


--
-- TOC entry 286 (class 1259 OID 20054)
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_preferences (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "minAge" integer DEFAULT 18,
    "maxAge" integer DEFAULT 40,
    "minHeightCm" integer,
    "maxHeightCm" integer,
    "maritalStatus" character varying(255),
    "religionId" integer,
    "casteId" integer,
    "educationId" integer,
    "countryId" integer,
    "stateId" integer,
    "preferredLocation" character varying(255),
    "preferredEducation" character varying(255),
    "preferredIncomeRange" character varying(100),
    "mustHave" jsonb,
    "dealBreakers" jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "partnerCastes" jsonb
);


ALTER TABLE public.user_preferences OWNER TO postgres;

--
-- TOC entry 285 (class 1259 OID 20053)
-- Name: user_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_preferences_id_seq OWNER TO postgres;

--
-- TOC entry 7250 (class 0 OID 0)
-- Dependencies: 285
-- Name: user_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_preferences_id_seq OWNED BY public.user_preferences.id;


--
-- TOC entry 250 (class 1259 OID 17270)
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    dob date,
    "heightCm" integer,
    "physicalStatus" character varying(50) DEFAULT 'Normal'::character varying,
    "maritalStatus" character varying(50) DEFAULT 'Never Married'::character varying,
    "childrenCount" integer DEFAULT 0,
    "childrenLivingWith" boolean DEFAULT false,
    "motherTongueId" integer,
    "religionId" integer,
    "casteId" integer,
    subcaste character varying(100),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    complexion character varying(50),
    "shortBio" text,
    "profileStrength" integer DEFAULT 0,
    "convenientTimeToCall" character varying(100),
    "linkedInUrl" character varying(255),
    "instagramUrl" character varying(255),
    "facebookUrl" character varying(255),
    "countryId" integer,
    "stateId" integer,
    "cityId" integer,
    "educationId" integer,
    "employmentTypeId" integer,
    "occupationId" integer,
    "incomeRangeId" integer,
    "familyStatus" character varying(50),
    "incomeCurrencyId" integer,
    "profileVisibility" character varying(50) DEFAULT 'Public'::character varying,
    "privacySettings" jsonb DEFAULT '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}'::jsonb,
    "approvalStatus" public."enum_user_profiles_approvalStatus" DEFAULT 'pending'::public."enum_user_profiles_approvalStatus",
    "moderationReason" text
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 17269)
-- Name: user_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_profiles_id_seq OWNER TO postgres;

--
-- TOC entry 7251 (class 0 OID 0)
-- Dependencies: 249
-- Name: user_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_profiles_id_seq OWNED BY public.user_profiles.id;


--
-- TOC entry 248 (class 1259 OID 17222)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "createdFor" public."enum_users_createdFor" DEFAULT 'Myself'::public."enum_users_createdFor" NOT NULL,
    gender public.enum_users_gender NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100),
    mobile character varying(20),
    email character varying(150) NOT NULL,
    "passwordHash" character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'user'::public.enum_users_role,
    "isActive" boolean DEFAULT true,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "countryCodeId" integer,
    "lastLoginAt" timestamp with time zone,
    "ipAddress" character varying(45)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 17221)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 7252 (class 0 OID 0)
-- Dependencies: 247
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 288 (class 1259 OID 39925)
-- Name: waitlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waitlists (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "planName" character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.waitlists OWNER TO postgres;

--
-- TOC entry 287 (class 1259 OID 39924)
-- Name: waitlists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.waitlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.waitlists_id_seq OWNER TO postgres;

--
-- TOC entry 7253 (class 0 OID 0)
-- Dependencies: 287
-- Name: waitlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.waitlists_id_seq OWNED BY public.waitlists.id;


--
-- TOC entry 5180 (class 2604 OID 19771)
-- Name: badges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges ALTER COLUMN id SET DEFAULT nextval('public.badges_id_seq'::regclass);


--
-- TOC entry 5169 (class 2604 OID 17573)
-- Name: blocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks ALTER COLUMN id SET DEFAULT nextval('public.blocks_id_seq'::regclass);


--
-- TOC entry 5125 (class 2604 OID 17087)
-- Name: castes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.castes ALTER COLUMN id SET DEFAULT nextval('public.castes_id_seq'::regclass);


--
-- TOC entry 5119 (class 2604 OID 17051)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- TOC entry 5115 (class 2604 OID 17023)
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- TOC entry 5204 (class 2604 OID 117617)
-- Name: coupons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons ALTER COLUMN id SET DEFAULT nextval('public.coupons_id_seq'::regclass);


--
-- TOC entry 5133 (class 2604 OID 17161)
-- Name: currencies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currencies ALTER COLUMN id SET DEFAULT nextval('public.currencies_id_seq'::regclass);


--
-- TOC entry 5179 (class 2604 OID 19751)
-- Name: education_career id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_career ALTER COLUMN id SET DEFAULT nextval('public.education_career_id_seq'::regclass);


--
-- TOC entry 5128 (class 2604 OID 17125)
-- Name: educations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations ALTER COLUMN id SET DEFAULT nextval('public.educations_id_seq'::regclass);


--
-- TOC entry 5130 (class 2604 OID 17136)
-- Name: employment_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employment_types ALTER COLUMN id SET DEFAULT nextval('public.employment_types_id_seq'::regclass);


--
-- TOC entry 5175 (class 2604 OID 19633)
-- Name: family_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.family_details ALTER COLUMN id SET DEFAULT nextval('public.family_details_id_seq'::regclass);


--
-- TOC entry 5201 (class 2604 OID 63950)
-- Name: gothrams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams ALTER COLUMN id SET DEFAULT nextval('public.gothrams_id_seq'::regclass);


--
-- TOC entry 5127 (class 2604 OID 17103)
-- Name: heights id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights ALTER COLUMN id SET DEFAULT nextval('public.heights_id_seq'::regclass);


--
-- TOC entry 5177 (class 2604 OID 19669)
-- Name: horoscope_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details ALTER COLUMN id SET DEFAULT nextval('public.horoscope_details_id_seq'::regclass);


--
-- TOC entry 5134 (class 2604 OID 17172)
-- Name: income_ranges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income_ranges ALTER COLUMN id SET DEFAULT nextval('public.income_ranges_id_seq'::regclass);


--
-- TOC entry 5156 (class 2604 OID 17423)
-- Name: interests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests ALTER COLUMN id SET DEFAULT nextval('public.interests_id_seq'::regclass);


--
-- TOC entry 5199 (class 2604 OID 63938)
-- Name: laknams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams ALTER COLUMN id SET DEFAULT nextval('public.laknams_id_seq'::regclass);


--
-- TOC entry 5178 (class 2604 OID 19731)
-- Name: location_lifestyle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_lifestyle ALTER COLUMN id SET DEFAULT nextval('public.location_lifestyle_id_seq'::regclass);


--
-- TOC entry 5158 (class 2604 OID 17449)
-- Name: matches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches ALTER COLUMN id SET DEFAULT nextval('public.matches_id_seq'::regclass);


--
-- TOC entry 5160 (class 2604 OID 17472)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 5121 (class 2604 OID 17067)
-- Name: mother_tongues id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mother_tongues ALTER COLUMN id SET DEFAULT nextval('public.mother_tongues_id_seq'::regclass);


--
-- TOC entry 5192 (class 2604 OID 58241)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 5131 (class 2604 OID 17145)
-- Name: occupations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.occupations ALTER COLUMN id SET DEFAULT nextval('public.occupations_id_seq'::regclass);


--
-- TOC entry 5149 (class 2604 OID 17352)
-- Name: partner_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences ALTER COLUMN id SET DEFAULT nextval('public.partner_preferences_id_seq'::regclass);


--
-- TOC entry 5166 (class 2604 OID 17549)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 5203 (class 2604 OID 87871)
-- Name: phone_view_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone_view_logs ALTER COLUMN id SET DEFAULT nextval('public.phone_view_logs_id_seq'::regclass);


--
-- TOC entry 5162 (class 2604 OID 17498)
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- TOC entry 5194 (class 2604 OID 58265)
-- Name: profile_views id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_views ALTER COLUMN id SET DEFAULT nextval('public.profile_views_id_seq'::regclass);


--
-- TOC entry 5197 (class 2604 OID 63926)
-- Name: rasis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis ALTER COLUMN id SET DEFAULT nextval('public.rasis_id_seq'::regclass);


--
-- TOC entry 5123 (class 2604 OID 17077)
-- Name: religions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.religions ALTER COLUMN id SET DEFAULT nextval('public.religions_id_seq'::regclass);


--
-- TOC entry 5170 (class 2604 OID 17595)
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- TOC entry 5195 (class 2604 OID 63914)
-- Name: stars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars ALTER COLUMN id SET DEFAULT nextval('public.stars_id_seq'::regclass);


--
-- TOC entry 5117 (class 2604 OID 17035)
-- Name: states id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- TOC entry 5164 (class 2604 OID 17519)
-- Name: subscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions ALTER COLUMN id SET DEFAULT nextval('public.subscriptions_id_seq'::regclass);


--
-- TOC entry 5171 (class 2604 OID 17625)
-- Name: success_stories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories ALTER COLUMN id SET DEFAULT nextval('public.success_stories_id_seq'::regclass);


--
-- TOC entry 5172 (class 2604 OID 18922)
-- Name: user_drafts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts ALTER COLUMN id SET DEFAULT nextval('public.user_drafts_id_seq'::regclass);


--
-- TOC entry 5152 (class 2604 OID 17397)
-- Name: user_photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_photos ALTER COLUMN id SET DEFAULT nextval('public.user_photos_id_seq'::regclass);


--
-- TOC entry 5188 (class 2604 OID 20057)
-- Name: user_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences ALTER COLUMN id SET DEFAULT nextval('public.user_preferences_id_seq'::regclass);


--
-- TOC entry 5140 (class 2604 OID 17273)
-- Name: user_profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles ALTER COLUMN id SET DEFAULT nextval('public.user_profiles_id_seq'::regclass);


--
-- TOC entry 5136 (class 2604 OID 17225)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5191 (class 2604 OID 39928)
-- Name: waitlists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waitlists ALTER COLUMN id SET DEFAULT nextval('public.waitlists_id_seq'::regclass);


--
-- TOC entry 7187 (class 0 OID 19768)
-- Dependencies: 284
-- Data for Name: badges; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('109', '139', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-03-03 21:22:32.441+05:30', '2026-03-03 21:22:32.441+05:30');
INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('110', '143', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-03-03 21:29:06.602+05:30', '2026-03-03 21:29:06.602+05:30');
INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('111', '145', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-03-22 20:21:25.846+05:30', '2026-03-22 20:21:25.846+05:30');
INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('112', '147', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-03-22 23:57:58.723+05:30', '2026-03-22 23:57:58.723+05:30');
INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('113', '150', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-04-05 12:39:56.026+05:30', '2026-04-05 12:39:56.026+05:30');
INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('114', '160', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-04-05 17:29:35.152+05:30', '2026-04-05 17:29:35.152+05:30');
INSERT INTO public.badges (id, "userProfileId", "mobileVerified", "emailVerified", "idVerified", "adminApproved", "premiumMember", "horoscopeAvailable", "highIntent", "createdAt", "updatedAt") VALUES ('106', '131', 't', 'f', 'f', 'f', 'f', 'f', 'f', '2026-03-02 17:37:28.696+05:30', '2026-03-02 17:37:28.696+05:30');


--
-- TOC entry 7171 (class 0 OID 17570)
-- Dependencies: 268
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7137 (class 0 OID 17084)
-- Dependencies: 234
-- Data for Name: castes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('200', '1', 'Sunni', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('201', '1', 'Shia', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('202', '1', 'Sunni Hanafi', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('203', '1', 'Sunni Shafi', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('204', '1', 'Syed', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('205', '1', 'Sheikh', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('206', '1', 'Pathan', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('207', '1', 'Mughal', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('208', '1', 'Ansari', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('209', '1', 'Qureshi', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('210', '1', 'Memon', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('211', '1', 'Labbai', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('212', '1', 'Rowther', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('213', '1', 'Dawoodi Bohra', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('214', '1', 'Shia Bohra', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('215', '1', 'Ismaili', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('216', '1', 'Ahle Hadith', 't');
INSERT INTO public.castes (id, "religionId", name, "isActive") VALUES ('217', '1', 'Other', 't');


--
-- TOC entry 7131 (class 0 OID 17048)
-- Dependencies: 228
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('1', '1', 'Visakhapatnam', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('2', '1', 'Vijayawada', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('3', '1', 'Guntur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('4', '2', 'Itanagar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('5', '3', 'Guwahati', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('6', '3', 'Silchar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('7', '4', 'Patna', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('8', '4', 'Gaya', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('9', '4', 'Muzaffarpur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('10', '5', 'Raipur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('11', '5', 'Bhilai', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('12', '6', 'Panaji', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('13', '6', 'Margao', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('14', '7', 'Ahmedabad', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('15', '7', 'Surat', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('16', '7', 'Vadodara', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('17', '7', 'Rajkot', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('18', '8', 'Gurugram', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('19', '8', 'Faridabad', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('20', '8', 'Panipat', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('21', '9', 'Shimla', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('22', '9', 'Dharamshala', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('23', '10', 'Ranchi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('24', '10', 'Jamshedpur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('25', '11', 'Bengaluru', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('26', '11', 'Mysuru', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('27', '11', 'Mangaluru', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('28', '11', 'Hubballi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('29', '12', 'Kochi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('30', '12', 'Thiruvananthapuram', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('31', '12', 'Kozhikode', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('32', '13', 'Indore', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('33', '13', 'Bhopal', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('34', '13', 'Gwalior', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('35', '14', 'Mumbai', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('36', '14', 'Pune', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('37', '14', 'Nagpur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('38', '14', 'Nashik', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('39', '14', 'Thane', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('40', '15', 'Imphal', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('41', '16', 'Shillong', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('42', '17', 'Aizawl', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('43', '18', 'Kohima', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('44', '18', 'Dimapur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('45', '19', 'Bhubaneswar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('46', '19', 'Cuttack', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('47', '20', 'Ludhiana', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('48', '20', 'Amritsar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('49', '20', 'Jalandhar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('50', '20', 'Patiala', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('51', '21', 'Jaipur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('52', '21', 'Udaipur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('53', '21', 'Jodhpur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('54', '21', 'Kota', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('55', '22', 'Gangtok', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('56', '23', 'Chennai', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('57', '23', 'Coimbatore', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('58', '23', 'Madurai', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('59', '23', 'Salem', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('60', '24', 'Hyderabad', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('61', '24', 'Warangal', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('62', '25', 'Agartala', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('63', '26', 'Lucknow', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('64', '26', 'Kanpur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('65', '26', 'Noida', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('66', '26', 'Ghaziabad', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('67', '26', 'Varanasi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('68', '26', 'Agra', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('69', '27', 'Dehradun', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('70', '27', 'Haridwar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('71', '28', 'Kolkata', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('72', '28', 'Siliguri', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('73', '28', 'Durgapur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('74', '23', 'Tiruchirappalli', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('75', '23', 'Tirunelveli', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('76', '23', 'Erode', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('77', '23', 'Vellore', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('78', '23', 'Thoothukudi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('79', '23', 'Dindigul', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('80', '23', 'Thanjavur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('81', '23', 'Nagercoil', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('82', '23', 'Hosur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('83', '23', 'Kanchipuram', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('84', '23', 'Karur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('85', '23', 'Namakkal', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('86', '23', 'Cuddalore', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('87', '23', 'Sivakasi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('88', '23', 'Tiruppur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('89', '23', 'Kumbakonam', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('90', '12', 'Thrissur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('91', '12', 'Kollam', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('92', '12', 'Alappuzha', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('93', '12', 'Palakkad', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('94', '12', 'Kannur', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('95', '12', 'Kottayam', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('96', '12', 'Malappuram', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('97', '12', 'Pathanamthitta', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('98', '12', 'Idukki', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('99', '12', 'Kasargod', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('100', '11', 'Belagavi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('101', '11', 'Davangere', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('102', '11', 'Ballari', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('103', '11', 'Vijayapura', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('104', '11', 'Shivamogga', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('105', '11', 'Tumakuru', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('106', '11', 'Udupi', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('107', '11', 'Kolar', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('108', '11', 'Hassan', 't');
INSERT INTO public.cities (id, "stateId", name, "isActive") VALUES ('109', '11', 'Raichur', 't');


--
-- TOC entry 7127 (class 0 OID 17020)
-- Dependencies: 224
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries (id, name, "isoCode", "phoneCode", "isActive") VALUES ('1', 'India', 'IN', '+91', 't');


--
-- TOC entry 7207 (class 0 OID 117614)
-- Dependencies: 304
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7147 (class 0 OID 17158)
-- Dependencies: 244
-- Data for Name: currencies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.currencies (id, name, symbol, code) VALUES ('1', 'INDIA', 'R', 'IN');


--
-- TOC entry 7185 (class 0 OID 19748)
-- Dependencies: 282
-- Data for Name: education_career; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.education_career (id, "userProfileId", "highestEducation", "fieldOfStudy", college, "employmentType", "companyName", designation, "incomeRange", "exactIncome", assets, "careerPlanAfterMarriage", "createdAt", "updatedAt") VALUES ('110', '139', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-03 21:23:38.289+05:30', '2026-03-03 21:26:45.713+05:30');
INSERT INTO public.education_career (id, "userProfileId", "highestEducation", "fieldOfStudy", college, "employmentType", "companyName", designation, "incomeRange", "exactIncome", assets, "careerPlanAfterMarriage", "createdAt", "updatedAt") VALUES ('114', '145', 'B.E / B.Tech', NULL, NULL, 'Private', NULL, 'Dev', '15L - 25L', NULL, NULL, NULL, '2026-03-22 23:50:46.013+05:30', '2026-03-23 00:31:54.051+05:30');
INSERT INTO public.education_career (id, "userProfileId", "highestEducation", "fieldOfStudy", college, "employmentType", "companyName", designation, "incomeRange", "exactIncome", assets, "careerPlanAfterMarriage", "createdAt", "updatedAt") VALUES ('105', '131', 'MCA', NULL, NULL, 'Private', NULL, 'Dev', '3L - 6L', NULL, NULL, NULL, '2026-03-02 17:42:22.706+05:30', '2026-03-03 21:01:08.842+05:30');
INSERT INTO public.education_career (id, "userProfileId", "highestEducation", "fieldOfStudy", college, "employmentType", "companyName", designation, "incomeRange", "exactIncome", assets, "careerPlanAfterMarriage", "createdAt", "updatedAt") VALUES ('113', '143', 'VVV', NULL, NULL, 'Government', NULL, 'Dev', '3L - 6L', NULL, NULL, NULL, '2026-03-03 21:30:53.113+05:30', '2026-03-03 21:30:53.113+05:30');
INSERT INTO public.education_career (id, "userProfileId", "highestEducation", "fieldOfStudy", college, "employmentType", "companyName", designation, "incomeRange", "exactIncome", assets, "careerPlanAfterMarriage", "createdAt", "updatedAt") VALUES ('115', '147', 'B.E / B.Tech', NULL, NULL, 'Private', NULL, NULL, '15L - 25L', NULL, NULL, NULL, '2026-03-23 00:12:57.859+05:30', '2026-04-05 17:49:29.678+05:30');


--
-- TOC entry 7141 (class 0 OID 17122)
-- Dependencies: 238
-- Data for Name: educations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.educations (id, level, name, "isActive") VALUES ('2', 'UG', 'B.E / B.Tech', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('3', 'UG', 'B.Sc', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('4', 'UG', 'B.Com', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('5', 'UG', 'B.A', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('6', 'UG', 'MBBS', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('7', 'UG', 'BBA', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('8', 'UG', 'BCA', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('9', 'PG', 'M.E / M.Tech', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('10', 'PG', 'M.Sc', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('11', 'PG', 'M.Com', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('12', 'PG', 'M.A', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('13', 'PG', 'MBA', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('14', 'PG', 'MCA', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('15', 'PG', 'MD / MS', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('16', 'Doctorate', 'Ph.D', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('17', 'Doctorate', 'Doctorate in Medicine', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('18', 'Diploma', 'Polytechnic Diploma', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('19', 'HSC', 'Higher Secondary', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('20', 'SSLC', 'SSLC', 't');
INSERT INTO public.educations (id, level, name, "isActive") VALUES ('21', 'Other', 'Other', 't');


--
-- TOC entry 7143 (class 0 OID 17133)
-- Dependencies: 240
-- Data for Name: employment_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employment_types (id, name) VALUES ('1', 'Private');
INSERT INTO public.employment_types (id, name) VALUES ('2', 'Government');
INSERT INTO public.employment_types (id, name) VALUES ('3', 'Business');
INSERT INTO public.employment_types (id, name) VALUES ('4', 'Self Employed');
INSERT INTO public.employment_types (id, name) VALUES ('5', 'Not Working');


--
-- TOC entry 7179 (class 0 OID 19630)
-- Dependencies: 276
-- Data for Name: family_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.family_details (id, "userProfileId", "fatherName", "fatherOccupation", "motherName", "motherOccupation", "familyType", "familyStatus", "siblingsCount", "ownHouse", "nativeDistrict", "familyLocation", "createdAt", "updatedAt") VALUES ('110', '139', NULL, NULL, NULL, NULL, NULL, NULL, '0', 'f', NULL, NULL, '2026-03-03 21:23:38.14+05:30', '2026-03-03 21:26:45.707+05:30');
INSERT INTO public.family_details (id, "userProfileId", "fatherName", "fatherOccupation", "motherName", "motherOccupation", "familyType", "familyStatus", "siblingsCount", "ownHouse", "nativeDistrict", "familyLocation", "createdAt", "updatedAt") VALUES ('114', '145', NULL, NULL, NULL, NULL, NULL, NULL, '0', 'f', NULL, NULL, '2026-03-22 23:50:45.959+05:30', '2026-03-23 00:31:54.041+05:30');
INSERT INTO public.family_details (id, "userProfileId", "fatherName", "fatherOccupation", "motherName", "motherOccupation", "familyType", "familyStatus", "siblingsCount", "ownHouse", "nativeDistrict", "familyLocation", "createdAt", "updatedAt") VALUES ('105', '131', 'Dillibabu', 'BSNL - Retried', 'Nagabooshanam', 'Homemaker', 'Nuclear', 'Middle Class', '2', 't', 'Pondicherry', NULL, '2026-03-02 17:42:22.671+05:30', '2026-03-03 21:01:08.838+05:30');
INSERT INTO public.family_details (id, "userProfileId", "fatherName", "fatherOccupation", "motherName", "motherOccupation", "familyType", "familyStatus", "siblingsCount", "ownHouse", "nativeDistrict", "familyLocation", "createdAt", "updatedAt") VALUES ('113', '143', 'Dillibabu', 'BSNL - Retried', 'Nagabooshanam', 'Homemaker', 'Nuclear', 'Middle Class', '0', 't', 'Pondicherry', NULL, '2026-03-03 21:30:53.024+05:30', '2026-03-03 21:30:53.024+05:30');
INSERT INTO public.family_details (id, "userProfileId", "fatherName", "fatherOccupation", "motherName", "motherOccupation", "familyType", "familyStatus", "siblingsCount", "ownHouse", "nativeDistrict", "familyLocation", "createdAt", "updatedAt") VALUES ('115', '147', 'Dillibabu', 'BSNL - Retried', 'Nagabooshanam', 'Homemaker', NULL, NULL, '0', 't', 'Pondicherry', NULL, '2026-03-23 00:12:57.814+05:30', '2026-04-05 17:40:04.812+05:30');


--
-- TOC entry 7203 (class 0 OID 63947)
-- Dependencies: 300
-- Data for Name: gothrams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gothrams (id, name, "isActive") VALUES ('1', 'Shiva', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('2', 'Kashyapa', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('3', 'Bharadwaja', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('4', 'Vasishta', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('5', 'Agasthya', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('6', 'Atri', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('7', 'Gautama', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('8', 'Koundinya', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('9', 'Vishwamitra', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('10', 'Haritha', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('11', 'Angirasa', 't');
INSERT INTO public.gothrams (id, name, "isActive") VALUES ('12', 'Other', 't');


--
-- TOC entry 7139 (class 0 OID 17100)
-- Dependencies: 236
-- Data for Name: heights; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('1', '135', '4''5" (135cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('2', '136', '4''6" (136cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('3', '137', '4''6" (137cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('4', '138', '4''6" (138cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('5', '139', '4''7" (139cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('6', '140', '4''7" (140cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('7', '141', '4''8" (141cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('8', '142', '4''8" (142cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('9', '143', '4''8" (143cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('10', '144', '4''9" (144cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('11', '145', '4''9" (145cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('12', '146', '4''9" (146cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('13', '147', '4''10" (147cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('14', '148', '4''10" (148cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('15', '149', '4''11" (149cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('16', '150', '4''11" (150cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('17', '151', '4''11" (151cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('18', '152', '4''12" (152cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('19', '153', '5''0" (153cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('20', '154', '5''1" (154cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('21', '155', '5''1" (155cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('22', '156', '5''1" (156cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('23', '157', '5''2" (157cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('24', '158', '5''2" (158cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('25', '159', '5''3" (159cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('26', '160', '5''3" (160cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('27', '161', '5''3" (161cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('28', '162', '5''4" (162cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('29', '163', '5''4" (163cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('30', '164', '5''5" (164cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('31', '165', '5''5" (165cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('32', '166', '5''5" (166cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('33', '167', '5''6" (167cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('34', '168', '5''6" (168cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('35', '169', '5''7" (169cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('36', '170', '5''7" (170cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('37', '171', '5''7" (171cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('38', '172', '5''8" (172cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('39', '173', '5''8" (173cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('40', '174', '5''9" (174cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('41', '175', '5''9" (175cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('42', '176', '5''9" (176cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('43', '177', '5''10" (177cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('44', '178', '5''10" (178cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('45', '179', '5''10" (179cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('46', '180', '5''11" (180cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('47', '181', '5''11" (181cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('48', '182', '5''12" (182cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('49', '183', '6''0" (183cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('50', '184', '6''0" (184cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('51', '185', '6''1" (185cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('52', '186', '6''1" (186cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('53', '187', '6''2" (187cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('54', '188', '6''2" (188cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('55', '189', '6''2" (189cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('56', '190', '6''3" (190cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('57', '191', '6''3" (191cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('58', '192', '6''4" (192cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('59', '193', '6''4" (193cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('60', '194', '6''4" (194cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('61', '195', '6''5" (195cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('62', '196', '6''5" (196cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('63', '197', '6''6" (197cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('64', '198', '6''6" (198cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('65', '199', '6''6" (199cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('66', '200', '6''7" (200cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('67', '201', '6''7" (201cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('68', '202', '6''8" (202cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('69', '203', '6''8" (203cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('70', '204', '6''8" (204cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('71', '205', '6''9" (205cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('72', '206', '6''9" (206cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('73', '207', '6''9" (207cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('74', '208', '6''10" (208cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('75', '209', '6''10" (209cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('76', '210', '6''11" (210cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('77', '211', '6''11" (211cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('78', '212', '6''11" (212cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('79', '213', '6''12" (213cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('80', '214', '7''0" (214cm)');
INSERT INTO public.heights (id, "cmValue", "displayLabel") VALUES ('81', '215', '7''1" (215cm)');


--
-- TOC entry 7181 (class 0 OID 19666)
-- Dependencies: 278
-- Data for Name: horoscope_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.horoscope_details (id, "userProfileId", star, rasi, laknam, gothram, "sevvaiDhosham", "rahuKetuDhosham", "birthTime", "birthPlace", "horoscopePdfUrl", "horoscopeImageUrl", "createdAt", "updatedAt", "starId", "rasiId", "laknamId", "gothramId", "birthCityId") VALUES ('115', '139', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-03 21:23:38.196+05:30', '2026-03-03 21:26:45.709+05:30', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.horoscope_details (id, "userProfileId", star, rasi, laknam, gothram, "sevvaiDhosham", "rahuKetuDhosham", "birthTime", "birthPlace", "horoscopePdfUrl", "horoscopeImageUrl", "createdAt", "updatedAt", "starId", "rasiId", "laknamId", "gothramId", "birthCityId") VALUES ('119', '145', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-22 23:50:45.977+05:30', '2026-03-23 00:31:54.044+05:30', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.horoscope_details (id, "userProfileId", star, rasi, laknam, gothram, "sevvaiDhosham", "rahuKetuDhosham", "birthTime", "birthPlace", "horoscopePdfUrl", "horoscopeImageUrl", "createdAt", "updatedAt", "starId", "rasiId", "laknamId", "gothramId", "birthCityId") VALUES ('109', '131', NULL, NULL, NULL, NULL, 'No', 'No', NULL, NULL, NULL, '/uploads/horoscope-1772453437318-530521184.jpg', '2026-03-02 17:40:37.44+05:30', '2026-03-03 21:01:08.839+05:30', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.horoscope_details (id, "userProfileId", star, rasi, laknam, gothram, "sevvaiDhosham", "rahuKetuDhosham", "birthTime", "birthPlace", "horoscopePdfUrl", "horoscopeImageUrl", "createdAt", "updatedAt", "starId", "rasiId", "laknamId", "gothramId", "birthCityId") VALUES ('118', '143', NULL, NULL, NULL, NULL, 'Don''t Know', 'Don''t Know', '05:12', NULL, NULL, NULL, '2026-03-03 21:30:53.027+05:30', '2026-03-03 21:30:53.027+05:30', '2', '1', '1', '1', '56');
INSERT INTO public.horoscope_details (id, "userProfileId", star, rasi, laknam, gothram, "sevvaiDhosham", "rahuKetuDhosham", "birthTime", "birthPlace", "horoscopePdfUrl", "horoscopeImageUrl", "createdAt", "updatedAt", "starId", "rasiId", "laknamId", "gothramId", "birthCityId") VALUES ('120', '147', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-23 00:12:57.831+05:30', '2026-04-05 17:06:28.777+05:30', NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 7149 (class 0 OID 17169)
-- Dependencies: 246
-- Data for Name: income_ranges; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.income_ranges (id, "currencyId", "minValue", "maxValue", "displayLabel", "sortOrder") VALUES ('1', '1', '15000', '100000', 'Ruppes', '1');


--
-- TOC entry 7159 (class 0 OID 17420)
-- Dependencies: 256
-- Data for Name: interests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.interests (id, "senderId", "receiverId", status, "createdAt", "updatedAt", "viewedAt") VALUES ('9', '131', '132', 'WITHDRAWN', '2026-03-03 23:24:54.188+05:30', '2026-03-04 00:20:17.008+05:30', NULL);
INSERT INTO public.interests (id, "senderId", "receiverId", status, "createdAt", "updatedAt", "viewedAt") VALUES ('8', '131', '128', 'PENDING', '2026-03-03 23:24:52.449+05:30', '2026-03-21 18:35:12.152+05:30', NULL);
INSERT INTO public.interests (id, "senderId", "receiverId", status, "createdAt", "updatedAt", "viewedAt") VALUES ('7', '132', '131', 'BLOCKED', '2026-03-03 21:39:20.056+05:30', '2026-03-22 15:09:15.365+05:30', '2026-03-03 21:39:50.174+05:30');
INSERT INTO public.interests (id, "senderId", "receiverId", status, "createdAt", "updatedAt", "viewedAt") VALUES ('10', '134', '131', 'PENDING', '2026-04-05 17:17:14.44+05:30', '2026-04-05 17:18:01.22+05:30', '2026-04-05 17:18:01.22+05:30');


--
-- TOC entry 7201 (class 0 OID 63935)
-- Dependencies: 298
-- Data for Name: laknams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.laknams (id, name, "isActive") VALUES ('1', 'Mesham', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('2', 'Rishabam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('3', 'Mithunam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('4', 'Kadagam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('5', 'Simmam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('6', 'Kanni', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('7', 'Thulam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('8', 'Vrischikam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('9', 'Dhanusu', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('10', 'Makaram', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('11', 'Kumbam', 't');
INSERT INTO public.laknams (id, name, "isActive") VALUES ('12', 'Meenam', 't');


--
-- TOC entry 7183 (class 0 OID 19728)
-- Dependencies: 280
-- Data for Name: location_lifestyle; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.location_lifestyle (id, "userProfileId", country, state, city, "relocatePreference", diet, drink, smoke, "fitnessLevel", languages, hobbies, "createdAt", "updatedAt", ambition, "familyOrientation", "emotionalStability", "communicationStyle", "spiritualInclination") VALUES ('110', '139', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', '2026-03-03 21:23:38.243+05:30', '2026-03-03 21:26:45.711+05:30', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.location_lifestyle (id, "userProfileId", country, state, city, "relocatePreference", diet, drink, smoke, "fitnessLevel", languages, hobbies, "createdAt", "updatedAt", ambition, "familyOrientation", "emotionalStability", "communicationStyle", "spiritualInclination") VALUES ('114', '145', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', '2026-03-22 23:50:45.995+05:30', '2026-03-23 00:31:54.048+05:30', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.location_lifestyle (id, "userProfileId", country, state, city, "relocatePreference", diet, drink, smoke, "fitnessLevel", languages, hobbies, "createdAt", "updatedAt", ambition, "familyOrientation", "emotionalStability", "communicationStyle", "spiritualInclination") VALUES ('113', '143', 'India', 'Tamil Nadu', 'chennai', 'Flexible', 'Veg', 'No', 'No', 'Occasional', '[]', '[]', '2026-03-03 21:30:53.099+05:30', '2026-03-03 21:30:53.099+05:30', '4', '4', '3', '3', '4');
INSERT INTO public.location_lifestyle (id, "userProfileId", country, state, city, "relocatePreference", diet, drink, smoke, "fitnessLevel", languages, hobbies, "createdAt", "updatedAt", ambition, "familyOrientation", "emotionalStability", "communicationStyle", "spiritualInclination") VALUES ('115', '147', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', '2026-03-23 00:12:57.846+05:30', '2026-04-05 17:06:28.779+05:30', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.location_lifestyle (id, "userProfileId", country, state, city, "relocatePreference", diet, drink, smoke, "fitnessLevel", languages, hobbies, "createdAt", "updatedAt", ambition, "familyOrientation", "emotionalStability", "communicationStyle", "spiritualInclination") VALUES ('105', '131', 'India', 'Tamil Nadu', 'chennai', 'Flexible', 'Veg', 'No', 'No', 'Occasional', '[]', '[]', '2026-03-02 17:42:22.69+05:30', '2026-03-03 21:01:08.841+05:30', '4', '4', '3', '3', '4');


--
-- TOC entry 7161 (class 0 OID 17446)
-- Dependencies: 258
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7163 (class 0 OID 17469)
-- Dependencies: 260
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7133 (class 0 OID 17064)
-- Dependencies: 230
-- Data for Name: mother_tongues; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('1', 'Tamil', 'TA', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('2', 'Telugu', 'TE', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('3', 'Kannada', 'KN', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('4', 'Malayalam', 'ML', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('5', 'Hindi', 'HI', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('6', 'Urdu', 'UR', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('7', 'English', 'EN', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('8', 'Marathi', 'MR', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('9', 'Gujarati', 'GU', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('10', 'Punjabi', 'PA', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('11', 'Bengali', 'BN', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('12', 'Odia', 'OR', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('13', 'Assamese', 'AS', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('14', 'Konkani', 'KO', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('15', 'Tulu', 'TU', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('16', 'Sourashtra', 'SAU', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('17', 'Sindhi', 'SD', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('18', 'Arabic', 'AR', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('19', 'French', 'FR', 't');
INSERT INTO public.mother_tongues (id, name, code, "isActive") VALUES ('20', 'Other', 'OTH', 't');


--
-- TOC entry 7193 (class 0 OID 58238)
-- Dependencies: 290
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7145 (class 0 OID 17142)
-- Dependencies: 242
-- Data for Name: occupations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.occupations (id, "employmentTypeId", name, "isActive") VALUES ('1', '1', 'Sotware Engineer', 't');


--
-- TOC entry 7155 (class 0 OID 17349)
-- Dependencies: 252
-- Data for Name: partner_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7169 (class 0 OID 17546)
-- Dependencies: 266
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7205 (class 0 OID 87868)
-- Dependencies: 302
-- Data for Name: phone_view_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7165 (class 0 OID 17495)
-- Dependencies: 262
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('7', 'Elite Gold', '50000.00', NULL, 't', '2026-03-02 09:48:09.469+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('8', 'Elite Gold', '90000.00', NULL, 't', '2026-03-02 09:48:09.473+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('9', 'Elite Gold', '150000.00', NULL, 't', '2026-03-02 09:48:09.478+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('1', 'Silver', '3499.00', NULL, 't', '2026-03-02 09:48:09.316+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('2', 'Silver', '5000.00', NULL, 't', '2026-03-02 09:48:09.445+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('3', 'Silver', '9999.00', NULL, 't', '2026-03-02 09:48:09.45+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('4', 'Gold', '8000.00', NULL, 't', '2026-03-02 09:48:09.455+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('5', 'Gold', '14000.00', NULL, 't', '2026-03-02 09:48:09.459+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('6', 'Gold', '24000.00', NULL, 't', '2026-03-02 09:48:09.464+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('10', 'Elite Gold', '50000.00', NULL, 't', '2026-03-02 23:05:57.678+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('11', 'Elite Gold', '90000.00', NULL, 't', '2026-03-02 23:05:57.68+05:30');
INSERT INTO public.plans (id, name, "monthlyPrice", features, "isActive", "createdAt") VALUES ('12', 'Elite Gold', '150000.00', NULL, 't', '2026-03-02 23:05:57.681+05:30');


--
-- TOC entry 7195 (class 0 OID 58262)
-- Dependencies: 292
-- Data for Name: profile_views; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7199 (class 0 OID 63923)
-- Dependencies: 296
-- Data for Name: rasis; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rasis (id, name, "isActive") VALUES ('1', 'Mesham', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('2', 'Rishabam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('3', 'Mithunam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('4', 'Kadagam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('5', 'Simmam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('6', 'Kanni', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('7', 'Thulam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('8', 'Vrischikam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('9', 'Dhanusu', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('10', 'Makaram', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('11', 'Kumbam', 't');
INSERT INTO public.rasis (id, name, "isActive") VALUES ('12', 'Meenam', 't');


--
-- TOC entry 7135 (class 0 OID 17074)
-- Dependencies: 232
-- Data for Name: religions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.religions (id, name, "isActive") VALUES ('1', 'Hindu', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('2', 'Muslim', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('3', 'Christian', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('4', 'Sikh', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('5', 'Buddhist', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('6', 'Jain', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('7', 'Parsi', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('8', 'Jewish', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('9', 'Bahai', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('10', 'Spiritual', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('11', 'No Religion', 't');
INSERT INTO public.religions (id, name, "isActive") VALUES ('99', 'Other', 't');


--
-- TOC entry 7173 (class 0 OID 17592)
-- Dependencies: 270
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7197 (class 0 OID 63911)
-- Dependencies: 294
-- Data for Name: stars; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.stars (id, name, "isActive") VALUES ('1', 'Ashwini', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('2', 'Bharani', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('3', 'Krittika', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('4', 'Rohini', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('5', 'Mrigashirsha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('6', 'Ardra', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('7', 'Punarvasu', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('8', 'Pushya', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('9', 'Ashlesha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('10', 'Magha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('11', 'Purva Phalguni', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('12', 'Uttara Phalguni', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('13', 'Hasta', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('14', 'Chitra', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('15', 'Swati', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('16', 'Vishakha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('17', 'Anuradha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('18', 'Jyeshtha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('19', 'Mula', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('20', 'Purva Ashadha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('21', 'Uttara Ashadha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('22', 'Shravana', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('23', 'Dhanishta', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('24', 'Shatabhisha', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('25', 'Purva Bhadrapada', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('26', 'Uttara Bhadrapada', 't');
INSERT INTO public.stars (id, name, "isActive") VALUES ('27', 'Revati', 't');


--
-- TOC entry 7129 (class 0 OID 17032)
-- Dependencies: 226
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('1', '1', 'Andhra Pradesh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('2', '1', 'Arunachal Pradesh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('3', '1', 'Assam', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('4', '1', 'Bihar', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('5', '1', 'Chhattisgarh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('6', '1', 'Goa', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('7', '1', 'Gujarat', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('8', '1', 'Haryana', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('9', '1', 'Himachal Pradesh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('10', '1', 'Jharkhand', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('11', '1', 'Karnataka', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('12', '1', 'Kerala', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('13', '1', 'Madhya Pradesh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('14', '1', 'Maharashtra', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('15', '1', 'Manipur', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('16', '1', 'Meghalaya', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('17', '1', 'Mizoram', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('18', '1', 'Nagaland', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('19', '1', 'Odisha', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('20', '1', 'Punjab', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('21', '1', 'Rajasthan', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('22', '1', 'Sikkim', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('23', '1', 'Tamil Nadu', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('24', '1', 'Telangana', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('25', '1', 'Tripura', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('26', '1', 'Uttar Pradesh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('27', '1', 'Uttarakhand', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('28', '1', 'West Bengal', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('29', '1', 'Andaman and Nicobar Islands', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('30', '1', 'Chandigarh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('31', '1', 'Dadra and Nagar Haveli and Daman and Diu', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('32', '1', 'Delhi', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('33', '1', 'Jammu and Kashmir', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('34', '1', 'Ladakh', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('35', '1', 'Lakshadweep', 't');
INSERT INTO public.states (id, "countryId", name, "isActive") VALUES ('36', '1', 'Puducherry', 't');


--
-- TOC entry 7167 (class 0 OID 17516)
-- Dependencies: 264
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subscriptions (id, "userId", "planId", "startDate", "endDate", status, "createdAt") VALUES ('4', '128', '6', '2026-03-02 10:42:19.285+05:30', '2026-09-02 10:42:19.277+05:30', 'active', '2026-03-02 10:42:19.286+05:30');


--
-- TOC entry 7175 (class 0 OID 17622)
-- Dependencies: 272
-- Data for Name: success_stories; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7177 (class 0 OID 18919)
-- Dependencies: 274
-- Data for Name: user_drafts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_drafts (id, "userId", "stepData", "lastStep", "createdAt", "updatedAt") VALUES ('1', '128', '{}', '0', '2026-03-03 17:05:27.743+05:30', '2026-03-03 18:34:17.566+05:30');
INSERT INTO public.user_drafts (id, "userId", "stepData", "lastStep", "createdAt", "updatedAt") VALUES ('16', '131', '{"createdFor":"Self","gender":"Female","firstName":"Uma","lastName":"","mobile":"09940238132","convenientTimeToCall":"Anytime","linkedInUrl":"","instagramUrl":"","facebookUrl":"","dob":"2026-04-05","height":"170","physicalStatus":"Normal","maritalStatus":"Never Married","childrenCount":"0","childrenLivingWith":false,"religionId":"","casteId":"","subCaste":"","motherTongue":"","fatherName":"","fatherOccupation":"","motherName":"","motherOccupation":"","familyType":"Nuclear","siblingsCount":0,"ownHouse":false,"nativeDistrict":"","showHoroscope":true,"starId":"","rasiId":"","laknamId":"","gothramId":"","sevvaiDhosham":"No","rahuKetuDhosham":"No","birthTime":"","birthPlace":"","birthCityId":"","horoscopeImageUrl":"","highestEducation":"","employmentType":"","designation":"","incomeRange":"","countryId":"","stateId":"","cityId":"","citizenship":"","partnerAgeMin":18,"partnerAgeMax":40,"partnerHeightMin":150,"partnerHeightMax":190,"partnerMaritalStatus":"Never Married","partnerReligion":"Hindu","partnerCastes":[],"partnerEducation":"","partnerCountry":"","partnerState":"","partnerLocationPreference":"Tamil Nadu","diet":"Veg","drink":"No","smoke":"No","fitness":"Occasional","relocation":"Flexible","careerAfterMarriage":"Yes","spirituality":"Not Spiritual","familyStatus":"Middle Class","aboutMe":"","profileVisibility":"Members Only"}', '2', '2026-03-03 21:25:58.379+05:30', '2026-04-05 15:00:55.767+05:30');
INSERT INTO public.user_drafts (id, "userId", "stepData", "lastStep", "createdAt", "updatedAt") VALUES ('19', '133', '{}', '0', '2026-03-23 00:23:09.009+05:30', '2026-03-23 00:31:54.071+05:30');
INSERT INTO public.user_drafts (id, "userId", "stepData", "lastStep", "createdAt", "updatedAt") VALUES ('25', '134', '{}', '0', '2026-04-05 16:45:18.03+05:30', '2026-04-05 17:53:02.012+05:30');


--
-- TOC entry 7157 (class 0 OID 17394)
-- Dependencies: 254
-- Data for Name: user_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_photos (id, "userId", url, "isMain", "order", "createdAt", "updatedAt", "approvalStatus") VALUES ('22', '128', '/uploads/photo-1772537523761-541886171.jpg', 'f', '0', '2026-03-03 17:02:03.765+05:30', '2026-03-03 20:23:23.144+05:30', 'rejected');
INSERT INTO public.user_photos (id, "userId", url, "isMain", "order", "createdAt", "updatedAt", "approvalStatus") VALUES ('24', '132', '/uploads/photo-1772553546617-914867393.png', 'f', '0', '2026-03-03 21:29:06.62+05:30', '2026-03-03 21:29:06.62+05:30', 'pending');
INSERT INTO public.user_photos (id, "userId", url, "isMain", "order", "createdAt", "updatedAt", "approvalStatus") VALUES ('25', '134', '/uploads/photo-1775389622383-812636487.jpg', 'f', '0', '2026-04-05 17:17:02.386+05:30', '2026-04-05 17:17:02.386+05:30', 'pending');


--
-- TOC entry 7189 (class 0 OID 20054)
-- Dependencies: 286
-- Data for Name: user_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_preferences (id, "userId", "minAge", "maxAge", "minHeightCm", "maxHeightCm", "maritalStatus", "religionId", "casteId", "educationId", "countryId", "stateId", "preferredLocation", "preferredEducation", "preferredIncomeRange", "mustHave", "dealBreakers", "createdAt", "updatedAt", "partnerCastes") VALUES ('110', '131', '18', '40', '150', '190', 'Never Married', '1', NULL, NULL, NULL, NULL, 'Tamil Nadu', '14', NULL, NULL, NULL, '2026-03-03 21:23:38.335+05:30', '2026-03-03 21:26:45.718+05:30', '[]');
INSERT INTO public.user_preferences (id, "userId", "minAge", "maxAge", "minHeightCm", "maxHeightCm", "maritalStatus", "religionId", "casteId", "educationId", "countryId", "stateId", "preferredLocation", "preferredEducation", "preferredIncomeRange", "mustHave", "dealBreakers", "createdAt", "updatedAt", "partnerCastes") VALUES ('114', '133', '18', '40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-22 23:50:46.031+05:30', '2026-03-23 00:31:54.053+05:30', '[]');
INSERT INTO public.user_preferences (id, "userId", "minAge", "maxAge", "minHeightCm", "maxHeightCm", "maritalStatus", "religionId", "casteId", "educationId", "countryId", "stateId", "preferredLocation", "preferredEducation", "preferredIncomeRange", "mustHave", "dealBreakers", "createdAt", "updatedAt", "partnerCastes") VALUES ('105', '128', '21', '35', '150', '190', 'Never Married', NULL, NULL, NULL, NULL, NULL, 'Tamil Nadu', NULL, NULL, NULL, NULL, '2026-03-02 17:42:22.72+05:30', '2026-03-03 21:01:08.844+05:30', '[]');
INSERT INTO public.user_preferences (id, "userId", "minAge", "maxAge", "minHeightCm", "maxHeightCm", "maritalStatus", "religionId", "casteId", "educationId", "countryId", "stateId", "preferredLocation", "preferredEducation", "preferredIncomeRange", "mustHave", "dealBreakers", "createdAt", "updatedAt", "partnerCastes") VALUES ('113', '132', '21', '35', '150', '190', 'Never Married', '1', NULL, NULL, NULL, NULL, 'Tamil Nadu', NULL, NULL, NULL, NULL, '2026-03-03 21:30:53.117+05:30', '2026-03-03 21:30:53.117+05:30', '["any"]');
INSERT INTO public.user_preferences (id, "userId", "minAge", "maxAge", "minHeightCm", "maxHeightCm", "maritalStatus", "religionId", "casteId", "educationId", "countryId", "stateId", "preferredLocation", "preferredEducation", "preferredIncomeRange", "mustHave", "dealBreakers", "createdAt", "updatedAt", "partnerCastes") VALUES ('115', '134', '18', '40', NULL, NULL, NULL, '1', NULL, '2', '1', '1', NULL, NULL, NULL, NULL, NULL, '2026-03-23 00:12:57.872+05:30', '2026-04-05 17:53:01.991+05:30', '["any"]');


--
-- TOC entry 7153 (class 0 OID 17270)
-- Dependencies: 250
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('139', '131', NULL, NULL, NULL, NULL, '0', 'f', NULL, NULL, NULL, '', '2026-03-03 21:22:32.389+05:30', '2026-03-03 21:37:36.451+05:30', '', '', '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Public', '{"showValues": false, "showHoroscope": false, "showAstroMatch": false, "showExactIncome": false, "showSocialLinks": false, "showBirthDetails": false, "showFamilyDetails": false}', 'approved', NULL);
INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('145', '133', NULL, NULL, NULL, NULL, '0', 'f', NULL, NULL, NULL, '', '2026-03-22 20:21:25.826+05:30', '2026-03-23 00:31:54.026+05:30', '', '', '15', NULL, NULL, NULL, NULL, '1', '1', '1', NULL, NULL, NULL, NULL, NULL, NULL, 'Public', '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}', 'pending', NULL);
INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('150', '135', NULL, NULL, 'Normal', 'Never Married', '0', 'f', NULL, NULL, NULL, NULL, '2026-04-05 12:39:56.001+05:30', '2026-04-05 12:39:56.001+05:30', NULL, NULL, '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Public', '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}', 'pending', NULL);
INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('143', '132', '1990-01-02', '177', 'Normal', 'Never Married', '0', 'f', '1', '1', NULL, '', '2026-03-03 21:29:06.559+05:30', '2026-03-03 21:37:51.88+05:30', '', 'Already part of AuraWeds?Already part of AuraWeds?', '15', 'Anytime', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Middle Class', NULL, 'Public', '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}', 'approved', NULL);
INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('160', '136', NULL, NULL, 'Normal', 'Never Married', '0', 'f', NULL, NULL, NULL, NULL, '2026-04-05 17:29:35.127+05:30', '2026-04-05 17:29:35.127+05:30', NULL, NULL, '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Public', '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}', 'pending', NULL);
INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('147', '134', '2003-12-29', '173', NULL, NULL, '0', 'f', '1', '1', '200', '12345', '2026-03-22 23:57:58.706+05:30', '2026-04-05 17:53:01.986+05:30', '', 'At least 20 characters pleaseAt least 20 characters please', '15', NULL, NULL, NULL, NULL, '1', '1', '1', NULL, NULL, NULL, NULL, NULL, NULL, 'Public', '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}', 'pending', NULL);
INSERT INTO public.user_profiles (id, "userId", dob, "heightCm", "physicalStatus", "maritalStatus", "childrenCount", "childrenLivingWith", "motherTongueId", "religionId", "casteId", subcaste, "createdAt", "updatedAt", complexion, "shortBio", "profileStrength", "convenientTimeToCall", "linkedInUrl", "instagramUrl", "facebookUrl", "countryId", "stateId", "cityId", "educationId", "employmentTypeId", "occupationId", "incomeRangeId", "familyStatus", "incomeCurrencyId", "profileVisibility", "privacySettings", "approvalStatus", "moderationReason") VALUES ('131', '128', '1990-08-14', '162', 'Normal', 'Never Married', '0', 'f', '1', '1', NULL, 'karava naidu', '2026-03-02 17:37:28.677+05:30', '2026-03-03 21:01:08.831+05:30', '', 'Already part of AuraWedsAlready part of AuraWeds', '15', 'Anytime', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Middle Class', NULL, 'Members Only', '{"showValues": true, "showHoroscope": true, "showAstroMatch": true, "showExactIncome": false, "showSocialLinks": true, "showBirthDetails": true, "showFamilyDetails": true}', 'approved', NULL);


--
-- TOC entry 7151 (class 0 OID 17222)
-- Dependencies: 248
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('131', 'Self', 'Female', 'Uma', '', '09940238132', 'uma@gmail.com', '$2b$10$0czdJbZjzwzk5LeIA8hbcelDLl7HXvxZR7bnqT8mx3PpGfvPb8yty', 'user', 't', NULL, '2026-03-03 21:22:32.369+05:30', '2026-04-07 20:45:45.673+05:30', NULL, '2026-04-07 20:45:45.673+05:30', '::1');
INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('135', 'Self', 'Male', 'Dharani R B', NULL, '09940238132', 'test1@gmail.com', '$2b$10$x5scCLH2ziFbqrO/aylzb.bKfCZ8JIsj7oy.3tsTNS/ZQvpBfNZw2', 'user', 't', NULL, '2026-04-05 12:39:55.966+05:30', '2026-04-05 12:39:55.966+05:30', NULL, NULL, NULL);
INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('133', 'Self', 'Other', 'User', '', '09940238132', 'rbdharan22@gmail.com', '$2b$10$/qdE5ua9.mSAKRz6/N0m2eV5dpnTEEVP3VRQkimcIxlyN28kyr/66', 'user', 't', NULL, '2026-03-22 20:21:25.72+05:30', '2026-04-07 20:31:37.218+05:30', NULL, '2026-04-07 20:31:37.218+05:30', '::1');
INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('132', 'Self', 'Male', 'Jandah', '', '09940238132', 'jandah@gmail.com', '$2b$10$Y0f5rruVkTthnrEtm8uhAe7rt2H/YoTkFC9u/H6Ugz1ene6BZJ6uu', 'user', 't', NULL, '2026-03-03 21:29:06.551+05:30', '2026-03-22 15:09:49.894+05:30', '1', '2026-03-22 15:09:49.894+05:30', '::1');
INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('136', 'Self', 'Male', 'Dharani Bala', NULL, '09940238132', 'rb22@gmail.com', '$2b$10$u/LJbN5l7Hf7q25Xc26d5OC56aZkdMyshGyi2wvAV3UJ4m6enhndq', 'user', 't', NULL, '2026-04-05 17:29:35.106+05:30', '2026-04-05 17:29:35.106+05:30', NULL, NULL, NULL);
INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('134', 'Self', 'Male', 'Dharanis', '', '09940238132', 'rbdha@gmail.com', '$2b$10$yiUTkk.1KQVOiDYX7sm0wOO9IfT4cJDjRoZ2d33vcpVw4lHUOER7m', 'user', 't', NULL, '2026-03-22 23:57:58.687+05:30', '2026-04-05 17:40:04.748+05:30', NULL, '2026-04-05 17:33:45.508+05:30', '::1');
INSERT INTO public.users (id, "createdFor", gender, "firstName", "lastName", mobile, email, "passwordHash", role, "isActive", "deletedAt", "createdAt", "updatedAt", "countryCodeId", "lastLoginAt", "ipAddress") VALUES ('128', 'Self', 'Male', 'Dharani Bala', '', '09940238132', 'admin@gmail.com', '$2b$10$at.5DWImOfMMWeqIU.2D7ON5K5Q6IN1mmOvTtqTkZmEPcSNTp4r/i', 'admin', 't', NULL, '2026-03-02 17:37:28.628+05:30', '2026-03-03 21:37:06.421+05:30', '1', '2026-03-03 21:37:06.42+05:30', '::1');


--
-- TOC entry 7191 (class 0 OID 39925)
-- Dependencies: 288
-- Data for Name: waitlists; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 7254 (class 0 OID 0)
-- Dependencies: 283
-- Name: badges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.badges_id_seq', 114, true);


--
-- TOC entry 7255 (class 0 OID 0)
-- Dependencies: 267
-- Name: blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blocks_id_seq', 1, false);


--
-- TOC entry 7256 (class 0 OID 0)
-- Dependencies: 233
-- Name: castes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.castes_id_seq', 1, true);


--
-- TOC entry 7257 (class 0 OID 0)
-- Dependencies: 227
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_id_seq', 1, true);


--
-- TOC entry 7258 (class 0 OID 0)
-- Dependencies: 223
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, true);


--
-- TOC entry 7259 (class 0 OID 0)
-- Dependencies: 303
-- Name: coupons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coupons_id_seq', 1, false);


--
-- TOC entry 7260 (class 0 OID 0)
-- Dependencies: 243
-- Name: currencies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.currencies_id_seq', 1, true);


--
-- TOC entry 7261 (class 0 OID 0)
-- Dependencies: 281
-- Name: education_career_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.education_career_id_seq', 125, true);


--
-- TOC entry 7262 (class 0 OID 0)
-- Dependencies: 237
-- Name: educations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.educations_id_seq', 21, true);


--
-- TOC entry 7263 (class 0 OID 0)
-- Dependencies: 239
-- Name: employment_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employment_types_id_seq', 1, true);


--
-- TOC entry 7264 (class 0 OID 0)
-- Dependencies: 275
-- Name: family_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.family_details_id_seq', 124, true);


--
-- TOC entry 7265 (class 0 OID 0)
-- Dependencies: 299
-- Name: gothrams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gothrams_id_seq', 855, true);


--
-- TOC entry 7266 (class 0 OID 0)
-- Dependencies: 235
-- Name: heights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.heights_id_seq', 81, true);


--
-- TOC entry 7267 (class 0 OID 0)
-- Dependencies: 277
-- Name: horoscope_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horoscope_details_id_seq', 128, true);


--
-- TOC entry 7268 (class 0 OID 0)
-- Dependencies: 245
-- Name: income_ranges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.income_ranges_id_seq', 1, true);


--
-- TOC entry 7269 (class 0 OID 0)
-- Dependencies: 255
-- Name: interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interests_id_seq', 10, true);


--
-- TOC entry 7270 (class 0 OID 0)
-- Dependencies: 297
-- Name: laknams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laknams_id_seq', 852, true);


--
-- TOC entry 7271 (class 0 OID 0)
-- Dependencies: 279
-- Name: location_lifestyle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_lifestyle_id_seq', 123, true);


--
-- TOC entry 7272 (class 0 OID 0)
-- Dependencies: 257
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matches_id_seq', 1, true);


--
-- TOC entry 7273 (class 0 OID 0)
-- Dependencies: 259
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- TOC entry 7274 (class 0 OID 0)
-- Dependencies: 229
-- Name: mother_tongues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mother_tongues_id_seq', 12, true);


--
-- TOC entry 7275 (class 0 OID 0)
-- Dependencies: 289
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 16, true);


--
-- TOC entry 7276 (class 0 OID 0)
-- Dependencies: 241
-- Name: occupations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.occupations_id_seq', 1, true);


--
-- TOC entry 7277 (class 0 OID 0)
-- Dependencies: 251
-- Name: partner_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partner_preferences_id_seq', 8, true);


--
-- TOC entry 7278 (class 0 OID 0)
-- Dependencies: 265
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- TOC entry 7279 (class 0 OID 0)
-- Dependencies: 301
-- Name: phone_view_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phone_view_logs_id_seq', 1, false);


--
-- TOC entry 7280 (class 0 OID 0)
-- Dependencies: 261
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plans_id_seq', 1, false);


--
-- TOC entry 7281 (class 0 OID 0)
-- Dependencies: 291
-- Name: profile_views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_views_id_seq', 1, false);


--
-- TOC entry 7282 (class 0 OID 0)
-- Dependencies: 295
-- Name: rasis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rasis_id_seq', 852, true);


--
-- TOC entry 7283 (class 0 OID 0)
-- Dependencies: 231
-- Name: religions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.religions_id_seq', 14, true);


--
-- TOC entry 7284 (class 0 OID 0)
-- Dependencies: 269
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- TOC entry 7285 (class 0 OID 0)
-- Dependencies: 293
-- Name: stars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stars_id_seq', 1917, true);


--
-- TOC entry 7286 (class 0 OID 0)
-- Dependencies: 225
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.states_id_seq', 1, true);


--
-- TOC entry 7287 (class 0 OID 0)
-- Dependencies: 263
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 3, true);


--
-- TOC entry 7288 (class 0 OID 0)
-- Dependencies: 271
-- Name: success_stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.success_stories_id_seq', 1, false);


--
-- TOC entry 7289 (class 0 OID 0)
-- Dependencies: 273
-- Name: user_drafts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_drafts_id_seq', 77, true);


--
-- TOC entry 7290 (class 0 OID 0)
-- Dependencies: 253
-- Name: user_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_photos_id_seq', 25, true);


--
-- TOC entry 7291 (class 0 OID 0)
-- Dependencies: 285
-- Name: user_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_preferences_id_seq', 124, true);


--
-- TOC entry 7292 (class 0 OID 0)
-- Dependencies: 249
-- Name: user_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_profiles_id_seq', 165, true);


--
-- TOC entry 7293 (class 0 OID 0)
-- Dependencies: 247
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 136, true);


--
-- TOC entry 7294 (class 0 OID 0)
-- Dependencies: 287
-- Name: waitlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.waitlists_id_seq', 1, false);


--
-- TOC entry 6203 (class 2606 OID 19784)
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (id);


--
-- TOC entry 6205 (class 2606 OID 19786)
-- Name: badges badges_userProfileId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT "badges_userProfileId_key" UNIQUE ("userProfileId");


--
-- TOC entry 5895 (class 2606 OID 17580)
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);


--
-- TOC entry 5218 (class 2606 OID 17093)
-- Name: castes castes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.castes
    ADD CONSTRAINT castes_pkey PRIMARY KEY (id);


--
-- TOC entry 5212 (class 2606 OID 17057)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 5208 (class 2606 OID 17030)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 6843 (class 2606 OID 192070)
-- Name: coupons coupons_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key UNIQUE (code);


--
-- TOC entry 6845 (class 2606 OID 192072)
-- Name: coupons coupons_code_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key1 UNIQUE (code);


--
-- TOC entry 6847 (class 2606 OID 192048)
-- Name: coupons coupons_code_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key10 UNIQUE (code);


--
-- TOC entry 6849 (class 2606 OID 192058)
-- Name: coupons coupons_code_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key11 UNIQUE (code);


--
-- TOC entry 6851 (class 2606 OID 192050)
-- Name: coupons coupons_code_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key12 UNIQUE (code);


--
-- TOC entry 6853 (class 2606 OID 192056)
-- Name: coupons coupons_code_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key13 UNIQUE (code);


--
-- TOC entry 6855 (class 2606 OID 192052)
-- Name: coupons coupons_code_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key14 UNIQUE (code);


--
-- TOC entry 6857 (class 2606 OID 192054)
-- Name: coupons coupons_code_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key15 UNIQUE (code);


--
-- TOC entry 6859 (class 2606 OID 192042)
-- Name: coupons coupons_code_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key16 UNIQUE (code);


--
-- TOC entry 6861 (class 2606 OID 192076)
-- Name: coupons coupons_code_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key17 UNIQUE (code);


--
-- TOC entry 6863 (class 2606 OID 192040)
-- Name: coupons coupons_code_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key18 UNIQUE (code);


--
-- TOC entry 6865 (class 2606 OID 192078)
-- Name: coupons coupons_code_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key19 UNIQUE (code);


--
-- TOC entry 6867 (class 2606 OID 192068)
-- Name: coupons coupons_code_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key2 UNIQUE (code);


--
-- TOC entry 6869 (class 2606 OID 192038)
-- Name: coupons coupons_code_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key20 UNIQUE (code);


--
-- TOC entry 6871 (class 2606 OID 192080)
-- Name: coupons coupons_code_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key21 UNIQUE (code);


--
-- TOC entry 6873 (class 2606 OID 192036)
-- Name: coupons coupons_code_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key22 UNIQUE (code);


--
-- TOC entry 6875 (class 2606 OID 192082)
-- Name: coupons coupons_code_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key23 UNIQUE (code);


--
-- TOC entry 6877 (class 2606 OID 192034)
-- Name: coupons coupons_code_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key24 UNIQUE (code);


--
-- TOC entry 6879 (class 2606 OID 192084)
-- Name: coupons coupons_code_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key25 UNIQUE (code);


--
-- TOC entry 6881 (class 2606 OID 192032)
-- Name: coupons coupons_code_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key26 UNIQUE (code);


--
-- TOC entry 6883 (class 2606 OID 192086)
-- Name: coupons coupons_code_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key27 UNIQUE (code);


--
-- TOC entry 6885 (class 2606 OID 192088)
-- Name: coupons coupons_code_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key28 UNIQUE (code);


--
-- TOC entry 6887 (class 2606 OID 192030)
-- Name: coupons coupons_code_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key29 UNIQUE (code);


--
-- TOC entry 6889 (class 2606 OID 192074)
-- Name: coupons coupons_code_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key3 UNIQUE (code);


--
-- TOC entry 6891 (class 2606 OID 192090)
-- Name: coupons coupons_code_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key30 UNIQUE (code);


--
-- TOC entry 6893 (class 2606 OID 192028)
-- Name: coupons coupons_code_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key31 UNIQUE (code);


--
-- TOC entry 6895 (class 2606 OID 192092)
-- Name: coupons coupons_code_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key32 UNIQUE (code);


--
-- TOC entry 6897 (class 2606 OID 192026)
-- Name: coupons coupons_code_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key33 UNIQUE (code);


--
-- TOC entry 6899 (class 2606 OID 192094)
-- Name: coupons coupons_code_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key34 UNIQUE (code);


--
-- TOC entry 6901 (class 2606 OID 192024)
-- Name: coupons coupons_code_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key35 UNIQUE (code);


--
-- TOC entry 6903 (class 2606 OID 192066)
-- Name: coupons coupons_code_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key4 UNIQUE (code);


--
-- TOC entry 6905 (class 2606 OID 192064)
-- Name: coupons coupons_code_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key5 UNIQUE (code);


--
-- TOC entry 6907 (class 2606 OID 192044)
-- Name: coupons coupons_code_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key6 UNIQUE (code);


--
-- TOC entry 6909 (class 2606 OID 192062)
-- Name: coupons coupons_code_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key7 UNIQUE (code);


--
-- TOC entry 6911 (class 2606 OID 192046)
-- Name: coupons coupons_code_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key8 UNIQUE (code);


--
-- TOC entry 6913 (class 2606 OID 192060)
-- Name: coupons coupons_code_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key9 UNIQUE (code);


--
-- TOC entry 6915 (class 2606 OID 117627)
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);


--
-- TOC entry 5528 (class 2606 OID 17167)
-- Name: currencies currencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);


--
-- TOC entry 6199 (class 2606 OID 19759)
-- Name: education_career education_career_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_career
    ADD CONSTRAINT education_career_pkey PRIMARY KEY (id);


--
-- TOC entry 6201 (class 2606 OID 19761)
-- Name: education_career education_career_userProfileId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_career
    ADD CONSTRAINT "education_career_userProfileId_key" UNIQUE ("userProfileId");


--
-- TOC entry 5522 (class 2606 OID 17131)
-- Name: educations educations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations
    ADD CONSTRAINT educations_pkey PRIMARY KEY (id);


--
-- TOC entry 5524 (class 2606 OID 17140)
-- Name: employment_types employment_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employment_types
    ADD CONSTRAINT employment_types_pkey PRIMARY KEY (id);


--
-- TOC entry 6187 (class 2606 OID 19642)
-- Name: family_details family_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.family_details
    ADD CONSTRAINT family_details_pkey PRIMARY KEY (id);


--
-- TOC entry 6189 (class 2606 OID 19644)
-- Name: family_details family_details_userProfileId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.family_details
    ADD CONSTRAINT "family_details_userProfileId_key" UNIQUE ("userProfileId");


--
-- TOC entry 6685 (class 2606 OID 190641)
-- Name: gothrams gothrams_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key UNIQUE (name);


--
-- TOC entry 6687 (class 2606 OID 190643)
-- Name: gothrams gothrams_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key1 UNIQUE (name);


--
-- TOC entry 6689 (class 2606 OID 190653)
-- Name: gothrams gothrams_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key10 UNIQUE (name);


--
-- TOC entry 6691 (class 2606 OID 190631)
-- Name: gothrams gothrams_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key11 UNIQUE (name);


--
-- TOC entry 6693 (class 2606 OID 190655)
-- Name: gothrams gothrams_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key12 UNIQUE (name);


--
-- TOC entry 6695 (class 2606 OID 190629)
-- Name: gothrams gothrams_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key13 UNIQUE (name);


--
-- TOC entry 6697 (class 2606 OID 190657)
-- Name: gothrams gothrams_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key14 UNIQUE (name);


--
-- TOC entry 6699 (class 2606 OID 190623)
-- Name: gothrams gothrams_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key15 UNIQUE (name);


--
-- TOC entry 6701 (class 2606 OID 190659)
-- Name: gothrams gothrams_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key16 UNIQUE (name);


--
-- TOC entry 6703 (class 2606 OID 190661)
-- Name: gothrams gothrams_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key17 UNIQUE (name);


--
-- TOC entry 6705 (class 2606 OID 190621)
-- Name: gothrams gothrams_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key18 UNIQUE (name);


--
-- TOC entry 6707 (class 2606 OID 190663)
-- Name: gothrams gothrams_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key19 UNIQUE (name);


--
-- TOC entry 6709 (class 2606 OID 190645)
-- Name: gothrams gothrams_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key2 UNIQUE (name);


--
-- TOC entry 6711 (class 2606 OID 190665)
-- Name: gothrams gothrams_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key20 UNIQUE (name);


--
-- TOC entry 6713 (class 2606 OID 190619)
-- Name: gothrams gothrams_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key21 UNIQUE (name);


--
-- TOC entry 6715 (class 2606 OID 190667)
-- Name: gothrams gothrams_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key22 UNIQUE (name);


--
-- TOC entry 6717 (class 2606 OID 190617)
-- Name: gothrams gothrams_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key23 UNIQUE (name);


--
-- TOC entry 6719 (class 2606 OID 190669)
-- Name: gothrams gothrams_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key24 UNIQUE (name);


--
-- TOC entry 6721 (class 2606 OID 190615)
-- Name: gothrams gothrams_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key25 UNIQUE (name);


--
-- TOC entry 6723 (class 2606 OID 190625)
-- Name: gothrams gothrams_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key26 UNIQUE (name);


--
-- TOC entry 6725 (class 2606 OID 190671)
-- Name: gothrams gothrams_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key27 UNIQUE (name);


--
-- TOC entry 6727 (class 2606 OID 190673)
-- Name: gothrams gothrams_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key28 UNIQUE (name);


--
-- TOC entry 6729 (class 2606 OID 190613)
-- Name: gothrams gothrams_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key29 UNIQUE (name);


--
-- TOC entry 6731 (class 2606 OID 190639)
-- Name: gothrams gothrams_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key3 UNIQUE (name);


--
-- TOC entry 6733 (class 2606 OID 190675)
-- Name: gothrams gothrams_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key30 UNIQUE (name);


--
-- TOC entry 6735 (class 2606 OID 190611)
-- Name: gothrams gothrams_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key31 UNIQUE (name);


--
-- TOC entry 6737 (class 2606 OID 190677)
-- Name: gothrams gothrams_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key32 UNIQUE (name);


--
-- TOC entry 6739 (class 2606 OID 190609)
-- Name: gothrams gothrams_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key33 UNIQUE (name);


--
-- TOC entry 6741 (class 2606 OID 190679)
-- Name: gothrams gothrams_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key34 UNIQUE (name);


--
-- TOC entry 6743 (class 2606 OID 190681)
-- Name: gothrams gothrams_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key35 UNIQUE (name);


--
-- TOC entry 6745 (class 2606 OID 190683)
-- Name: gothrams gothrams_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key36 UNIQUE (name);


--
-- TOC entry 6747 (class 2606 OID 190607)
-- Name: gothrams gothrams_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key37 UNIQUE (name);


--
-- TOC entry 6749 (class 2606 OID 190685)
-- Name: gothrams gothrams_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key38 UNIQUE (name);


--
-- TOC entry 6751 (class 2606 OID 190687)
-- Name: gothrams gothrams_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key39 UNIQUE (name);


--
-- TOC entry 6753 (class 2606 OID 190647)
-- Name: gothrams gothrams_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key4 UNIQUE (name);


--
-- TOC entry 6755 (class 2606 OID 190605)
-- Name: gothrams gothrams_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key40 UNIQUE (name);


--
-- TOC entry 6757 (class 2606 OID 190689)
-- Name: gothrams gothrams_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key41 UNIQUE (name);


--
-- TOC entry 6759 (class 2606 OID 190691)
-- Name: gothrams gothrams_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key42 UNIQUE (name);


--
-- TOC entry 6761 (class 2606 OID 190603)
-- Name: gothrams gothrams_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key43 UNIQUE (name);


--
-- TOC entry 6763 (class 2606 OID 190693)
-- Name: gothrams gothrams_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key44 UNIQUE (name);


--
-- TOC entry 6765 (class 2606 OID 190601)
-- Name: gothrams gothrams_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key45 UNIQUE (name);


--
-- TOC entry 6767 (class 2606 OID 190695)
-- Name: gothrams gothrams_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key46 UNIQUE (name);


--
-- TOC entry 6769 (class 2606 OID 190599)
-- Name: gothrams gothrams_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key47 UNIQUE (name);


--
-- TOC entry 6771 (class 2606 OID 190697)
-- Name: gothrams gothrams_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key48 UNIQUE (name);


--
-- TOC entry 6773 (class 2606 OID 190597)
-- Name: gothrams gothrams_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key49 UNIQUE (name);


--
-- TOC entry 6775 (class 2606 OID 190637)
-- Name: gothrams gothrams_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key5 UNIQUE (name);


--
-- TOC entry 6777 (class 2606 OID 190699)
-- Name: gothrams gothrams_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key50 UNIQUE (name);


--
-- TOC entry 6779 (class 2606 OID 190595)
-- Name: gothrams gothrams_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key51 UNIQUE (name);


--
-- TOC entry 6781 (class 2606 OID 190701)
-- Name: gothrams gothrams_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key52 UNIQUE (name);


--
-- TOC entry 6783 (class 2606 OID 190593)
-- Name: gothrams gothrams_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key53 UNIQUE (name);


--
-- TOC entry 6785 (class 2606 OID 190703)
-- Name: gothrams gothrams_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key54 UNIQUE (name);


--
-- TOC entry 6787 (class 2606 OID 190705)
-- Name: gothrams gothrams_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key55 UNIQUE (name);


--
-- TOC entry 6789 (class 2606 OID 190591)
-- Name: gothrams gothrams_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key56 UNIQUE (name);


--
-- TOC entry 6791 (class 2606 OID 190707)
-- Name: gothrams gothrams_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key57 UNIQUE (name);


--
-- TOC entry 6793 (class 2606 OID 190589)
-- Name: gothrams gothrams_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key58 UNIQUE (name);


--
-- TOC entry 6795 (class 2606 OID 190709)
-- Name: gothrams gothrams_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key59 UNIQUE (name);


--
-- TOC entry 6797 (class 2606 OID 190649)
-- Name: gothrams gothrams_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key6 UNIQUE (name);


--
-- TOC entry 6799 (class 2606 OID 190587)
-- Name: gothrams gothrams_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key60 UNIQUE (name);


--
-- TOC entry 6801 (class 2606 OID 190711)
-- Name: gothrams gothrams_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key61 UNIQUE (name);


--
-- TOC entry 6803 (class 2606 OID 190585)
-- Name: gothrams gothrams_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key62 UNIQUE (name);


--
-- TOC entry 6805 (class 2606 OID 190713)
-- Name: gothrams gothrams_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key63 UNIQUE (name);


--
-- TOC entry 6807 (class 2606 OID 190583)
-- Name: gothrams gothrams_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key64 UNIQUE (name);


--
-- TOC entry 6809 (class 2606 OID 190715)
-- Name: gothrams gothrams_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key65 UNIQUE (name);


--
-- TOC entry 6811 (class 2606 OID 190581)
-- Name: gothrams gothrams_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key66 UNIQUE (name);


--
-- TOC entry 6813 (class 2606 OID 190579)
-- Name: gothrams gothrams_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key67 UNIQUE (name);


--
-- TOC entry 6815 (class 2606 OID 190627)
-- Name: gothrams gothrams_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key68 UNIQUE (name);


--
-- TOC entry 6817 (class 2606 OID 190717)
-- Name: gothrams gothrams_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key69 UNIQUE (name);


--
-- TOC entry 6819 (class 2606 OID 190635)
-- Name: gothrams gothrams_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key7 UNIQUE (name);


--
-- TOC entry 6821 (class 2606 OID 190577)
-- Name: gothrams gothrams_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key70 UNIQUE (name);


--
-- TOC entry 6823 (class 2606 OID 190719)
-- Name: gothrams gothrams_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key71 UNIQUE (name);


--
-- TOC entry 6825 (class 2606 OID 190575)
-- Name: gothrams gothrams_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key72 UNIQUE (name);


--
-- TOC entry 6827 (class 2606 OID 190721)
-- Name: gothrams gothrams_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key73 UNIQUE (name);


--
-- TOC entry 6829 (class 2606 OID 190573)
-- Name: gothrams gothrams_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key74 UNIQUE (name);


--
-- TOC entry 6831 (class 2606 OID 190723)
-- Name: gothrams gothrams_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key75 UNIQUE (name);


--
-- TOC entry 6833 (class 2606 OID 190571)
-- Name: gothrams gothrams_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key76 UNIQUE (name);


--
-- TOC entry 6835 (class 2606 OID 190651)
-- Name: gothrams gothrams_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key8 UNIQUE (name);


--
-- TOC entry 6837 (class 2606 OID 190633)
-- Name: gothrams gothrams_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_name_key9 UNIQUE (name);


--
-- TOC entry 6839 (class 2606 OID 63955)
-- Name: gothrams gothrams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gothrams
    ADD CONSTRAINT gothrams_pkey PRIMARY KEY (id);


--
-- TOC entry 5220 (class 2606 OID 190152)
-- Name: heights heights_cmValue_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key" UNIQUE ("cmValue");


--
-- TOC entry 5222 (class 2606 OID 190150)
-- Name: heights heights_cmValue_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key1" UNIQUE ("cmValue");


--
-- TOC entry 5224 (class 2606 OID 190166)
-- Name: heights heights_cmValue_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key10" UNIQUE ("cmValue");


--
-- TOC entry 5226 (class 2606 OID 190264)
-- Name: heights heights_cmValue_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key100" UNIQUE ("cmValue");


--
-- TOC entry 5228 (class 2606 OID 190266)
-- Name: heights heights_cmValue_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key101" UNIQUE ("cmValue");


--
-- TOC entry 5230 (class 2606 OID 190274)
-- Name: heights heights_cmValue_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key102" UNIQUE ("cmValue");


--
-- TOC entry 5232 (class 2606 OID 190268)
-- Name: heights heights_cmValue_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key103" UNIQUE ("cmValue");


--
-- TOC entry 5234 (class 2606 OID 190272)
-- Name: heights heights_cmValue_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key104" UNIQUE ("cmValue");


--
-- TOC entry 5236 (class 2606 OID 190270)
-- Name: heights heights_cmValue_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key105" UNIQUE ("cmValue");


--
-- TOC entry 5238 (class 2606 OID 190122)
-- Name: heights heights_cmValue_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key106" UNIQUE ("cmValue");


--
-- TOC entry 5240 (class 2606 OID 190338)
-- Name: heights heights_cmValue_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key107" UNIQUE ("cmValue");


--
-- TOC entry 5242 (class 2606 OID 190340)
-- Name: heights heights_cmValue_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key108" UNIQUE ("cmValue");


--
-- TOC entry 5244 (class 2606 OID 190342)
-- Name: heights heights_cmValue_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key109" UNIQUE ("cmValue");


--
-- TOC entry 5246 (class 2606 OID 190142)
-- Name: heights heights_cmValue_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key11" UNIQUE ("cmValue");


--
-- TOC entry 5248 (class 2606 OID 190120)
-- Name: heights heights_cmValue_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key110" UNIQUE ("cmValue");


--
-- TOC entry 5250 (class 2606 OID 190344)
-- Name: heights heights_cmValue_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key111" UNIQUE ("cmValue");


--
-- TOC entry 5252 (class 2606 OID 190346)
-- Name: heights heights_cmValue_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key112" UNIQUE ("cmValue");


--
-- TOC entry 5254 (class 2606 OID 190118)
-- Name: heights heights_cmValue_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key113" UNIQUE ("cmValue");


--
-- TOC entry 5256 (class 2606 OID 190348)
-- Name: heights heights_cmValue_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key114" UNIQUE ("cmValue");


--
-- TOC entry 5258 (class 2606 OID 190350)
-- Name: heights heights_cmValue_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key115" UNIQUE ("cmValue");


--
-- TOC entry 5260 (class 2606 OID 190116)
-- Name: heights heights_cmValue_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key116" UNIQUE ("cmValue");


--
-- TOC entry 5262 (class 2606 OID 190352)
-- Name: heights heights_cmValue_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key117" UNIQUE ("cmValue");


--
-- TOC entry 5264 (class 2606 OID 190114)
-- Name: heights heights_cmValue_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key118" UNIQUE ("cmValue");


--
-- TOC entry 5266 (class 2606 OID 190354)
-- Name: heights heights_cmValue_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key119" UNIQUE ("cmValue");


--
-- TOC entry 5268 (class 2606 OID 190140)
-- Name: heights heights_cmValue_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key12" UNIQUE ("cmValue");


--
-- TOC entry 5270 (class 2606 OID 190112)
-- Name: heights heights_cmValue_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key120" UNIQUE ("cmValue");


--
-- TOC entry 5272 (class 2606 OID 190356)
-- Name: heights heights_cmValue_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key121" UNIQUE ("cmValue");


--
-- TOC entry 5274 (class 2606 OID 190110)
-- Name: heights heights_cmValue_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key122" UNIQUE ("cmValue");


--
-- TOC entry 5276 (class 2606 OID 190358)
-- Name: heights heights_cmValue_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key123" UNIQUE ("cmValue");


--
-- TOC entry 5278 (class 2606 OID 190108)
-- Name: heights heights_cmValue_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key124" UNIQUE ("cmValue");


--
-- TOC entry 5280 (class 2606 OID 190360)
-- Name: heights heights_cmValue_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key125" UNIQUE ("cmValue");


--
-- TOC entry 5282 (class 2606 OID 190106)
-- Name: heights heights_cmValue_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key126" UNIQUE ("cmValue");


--
-- TOC entry 5284 (class 2606 OID 190362)
-- Name: heights heights_cmValue_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key127" UNIQUE ("cmValue");


--
-- TOC entry 5286 (class 2606 OID 190364)
-- Name: heights heights_cmValue_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key128" UNIQUE ("cmValue");


--
-- TOC entry 5288 (class 2606 OID 190104)
-- Name: heights heights_cmValue_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key129" UNIQUE ("cmValue");


--
-- TOC entry 5290 (class 2606 OID 190168)
-- Name: heights heights_cmValue_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key13" UNIQUE ("cmValue");


--
-- TOC entry 5292 (class 2606 OID 190366)
-- Name: heights heights_cmValue_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key130" UNIQUE ("cmValue");


--
-- TOC entry 5294 (class 2606 OID 190102)
-- Name: heights heights_cmValue_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key131" UNIQUE ("cmValue");


--
-- TOC entry 5296 (class 2606 OID 190368)
-- Name: heights heights_cmValue_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key132" UNIQUE ("cmValue");


--
-- TOC entry 5298 (class 2606 OID 190100)
-- Name: heights heights_cmValue_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key133" UNIQUE ("cmValue");


--
-- TOC entry 5300 (class 2606 OID 190370)
-- Name: heights heights_cmValue_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key134" UNIQUE ("cmValue");


--
-- TOC entry 5302 (class 2606 OID 190098)
-- Name: heights heights_cmValue_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key135" UNIQUE ("cmValue");


--
-- TOC entry 5304 (class 2606 OID 190372)
-- Name: heights heights_cmValue_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key136" UNIQUE ("cmValue");


--
-- TOC entry 5306 (class 2606 OID 190096)
-- Name: heights heights_cmValue_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key137" UNIQUE ("cmValue");


--
-- TOC entry 5308 (class 2606 OID 190374)
-- Name: heights heights_cmValue_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key138" UNIQUE ("cmValue");


--
-- TOC entry 5310 (class 2606 OID 190094)
-- Name: heights heights_cmValue_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key139" UNIQUE ("cmValue");


--
-- TOC entry 5312 (class 2606 OID 190170)
-- Name: heights heights_cmValue_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key14" UNIQUE ("cmValue");


--
-- TOC entry 5314 (class 2606 OID 190092)
-- Name: heights heights_cmValue_key140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key140" UNIQUE ("cmValue");


--
-- TOC entry 5316 (class 2606 OID 190212)
-- Name: heights heights_cmValue_key141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key141" UNIQUE ("cmValue");


--
-- TOC entry 5318 (class 2606 OID 190376)
-- Name: heights heights_cmValue_key142; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key142" UNIQUE ("cmValue");


--
-- TOC entry 5320 (class 2606 OID 190090)
-- Name: heights heights_cmValue_key143; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key143" UNIQUE ("cmValue");


--
-- TOC entry 5322 (class 2606 OID 190378)
-- Name: heights heights_cmValue_key144; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key144" UNIQUE ("cmValue");


--
-- TOC entry 5324 (class 2606 OID 190088)
-- Name: heights heights_cmValue_key145; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key145" UNIQUE ("cmValue");


--
-- TOC entry 5326 (class 2606 OID 190380)
-- Name: heights heights_cmValue_key146; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key146" UNIQUE ("cmValue");


--
-- TOC entry 5328 (class 2606 OID 190086)
-- Name: heights heights_cmValue_key147; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key147" UNIQUE ("cmValue");


--
-- TOC entry 5330 (class 2606 OID 190084)
-- Name: heights heights_cmValue_key148; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key148" UNIQUE ("cmValue");


--
-- TOC entry 5332 (class 2606 OID 190082)
-- Name: heights heights_cmValue_key149; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key149" UNIQUE ("cmValue");


--
-- TOC entry 5334 (class 2606 OID 190124)
-- Name: heights heights_cmValue_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key15" UNIQUE ("cmValue");


--
-- TOC entry 5336 (class 2606 OID 190336)
-- Name: heights heights_cmValue_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key16" UNIQUE ("cmValue");


--
-- TOC entry 5338 (class 2606 OID 190172)
-- Name: heights heights_cmValue_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key17" UNIQUE ("cmValue");


--
-- TOC entry 5340 (class 2606 OID 190174)
-- Name: heights heights_cmValue_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key18" UNIQUE ("cmValue");


--
-- TOC entry 5342 (class 2606 OID 190176)
-- Name: heights heights_cmValue_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key19" UNIQUE ("cmValue");


--
-- TOC entry 5344 (class 2606 OID 190154)
-- Name: heights heights_cmValue_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key2" UNIQUE ("cmValue");


--
-- TOC entry 5346 (class 2606 OID 190178)
-- Name: heights heights_cmValue_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key20" UNIQUE ("cmValue");


--
-- TOC entry 5348 (class 2606 OID 190334)
-- Name: heights heights_cmValue_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key21" UNIQUE ("cmValue");


--
-- TOC entry 5350 (class 2606 OID 190180)
-- Name: heights heights_cmValue_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key22" UNIQUE ("cmValue");


--
-- TOC entry 5352 (class 2606 OID 190182)
-- Name: heights heights_cmValue_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key23" UNIQUE ("cmValue");


--
-- TOC entry 5354 (class 2606 OID 190332)
-- Name: heights heights_cmValue_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key24" UNIQUE ("cmValue");


--
-- TOC entry 5356 (class 2606 OID 190330)
-- Name: heights heights_cmValue_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key25" UNIQUE ("cmValue");


--
-- TOC entry 5358 (class 2606 OID 190184)
-- Name: heights heights_cmValue_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key26" UNIQUE ("cmValue");


--
-- TOC entry 5360 (class 2606 OID 190328)
-- Name: heights heights_cmValue_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key27" UNIQUE ("cmValue");


--
-- TOC entry 5362 (class 2606 OID 190326)
-- Name: heights heights_cmValue_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key28" UNIQUE ("cmValue");


--
-- TOC entry 5364 (class 2606 OID 190156)
-- Name: heights heights_cmValue_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key29" UNIQUE ("cmValue");


--
-- TOC entry 5366 (class 2606 OID 190158)
-- Name: heights heights_cmValue_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key3" UNIQUE ("cmValue");


--
-- TOC entry 5368 (class 2606 OID 190186)
-- Name: heights heights_cmValue_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key30" UNIQUE ("cmValue");


--
-- TOC entry 5370 (class 2606 OID 190324)
-- Name: heights heights_cmValue_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key31" UNIQUE ("cmValue");


--
-- TOC entry 5372 (class 2606 OID 190188)
-- Name: heights heights_cmValue_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key32" UNIQUE ("cmValue");


--
-- TOC entry 5374 (class 2606 OID 190322)
-- Name: heights heights_cmValue_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key33" UNIQUE ("cmValue");


--
-- TOC entry 5376 (class 2606 OID 190190)
-- Name: heights heights_cmValue_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key34" UNIQUE ("cmValue");


--
-- TOC entry 5378 (class 2606 OID 190320)
-- Name: heights heights_cmValue_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key35" UNIQUE ("cmValue");


--
-- TOC entry 5380 (class 2606 OID 190192)
-- Name: heights heights_cmValue_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key36" UNIQUE ("cmValue");


--
-- TOC entry 5382 (class 2606 OID 190318)
-- Name: heights heights_cmValue_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key37" UNIQUE ("cmValue");


--
-- TOC entry 5384 (class 2606 OID 190194)
-- Name: heights heights_cmValue_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key38" UNIQUE ("cmValue");


--
-- TOC entry 5386 (class 2606 OID 190196)
-- Name: heights heights_cmValue_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key39" UNIQUE ("cmValue");


--
-- TOC entry 5388 (class 2606 OID 190148)
-- Name: heights heights_cmValue_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key4" UNIQUE ("cmValue");


--
-- TOC entry 5390 (class 2606 OID 190316)
-- Name: heights heights_cmValue_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key40" UNIQUE ("cmValue");


--
-- TOC entry 5392 (class 2606 OID 190198)
-- Name: heights heights_cmValue_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key41" UNIQUE ("cmValue");


--
-- TOC entry 5394 (class 2606 OID 190314)
-- Name: heights heights_cmValue_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key42" UNIQUE ("cmValue");


--
-- TOC entry 5396 (class 2606 OID 190200)
-- Name: heights heights_cmValue_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key43" UNIQUE ("cmValue");


--
-- TOC entry 5398 (class 2606 OID 190202)
-- Name: heights heights_cmValue_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key44" UNIQUE ("cmValue");


--
-- TOC entry 5400 (class 2606 OID 190204)
-- Name: heights heights_cmValue_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key45" UNIQUE ("cmValue");


--
-- TOC entry 5402 (class 2606 OID 190312)
-- Name: heights heights_cmValue_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key46" UNIQUE ("cmValue");


--
-- TOC entry 5404 (class 2606 OID 190138)
-- Name: heights heights_cmValue_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key47" UNIQUE ("cmValue");


--
-- TOC entry 5406 (class 2606 OID 190206)
-- Name: heights heights_cmValue_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key48" UNIQUE ("cmValue");


--
-- TOC entry 5408 (class 2606 OID 190208)
-- Name: heights heights_cmValue_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key49" UNIQUE ("cmValue");


--
-- TOC entry 5410 (class 2606 OID 190160)
-- Name: heights heights_cmValue_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key5" UNIQUE ("cmValue");


--
-- TOC entry 5412 (class 2606 OID 190136)
-- Name: heights heights_cmValue_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key50" UNIQUE ("cmValue");


--
-- TOC entry 5414 (class 2606 OID 190210)
-- Name: heights heights_cmValue_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key51" UNIQUE ("cmValue");


--
-- TOC entry 5416 (class 2606 OID 190134)
-- Name: heights heights_cmValue_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key52" UNIQUE ("cmValue");


--
-- TOC entry 5418 (class 2606 OID 190214)
-- Name: heights heights_cmValue_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key53" UNIQUE ("cmValue");


--
-- TOC entry 5420 (class 2606 OID 190216)
-- Name: heights heights_cmValue_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key54" UNIQUE ("cmValue");


--
-- TOC entry 5422 (class 2606 OID 190132)
-- Name: heights heights_cmValue_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key55" UNIQUE ("cmValue");


--
-- TOC entry 5424 (class 2606 OID 190218)
-- Name: heights heights_cmValue_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key56" UNIQUE ("cmValue");


--
-- TOC entry 5426 (class 2606 OID 190130)
-- Name: heights heights_cmValue_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key57" UNIQUE ("cmValue");


--
-- TOC entry 5428 (class 2606 OID 190220)
-- Name: heights heights_cmValue_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key58" UNIQUE ("cmValue");


--
-- TOC entry 5430 (class 2606 OID 190222)
-- Name: heights heights_cmValue_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key59" UNIQUE ("cmValue");


--
-- TOC entry 5432 (class 2606 OID 190146)
-- Name: heights heights_cmValue_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key6" UNIQUE ("cmValue");


--
-- TOC entry 5434 (class 2606 OID 190128)
-- Name: heights heights_cmValue_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key60" UNIQUE ("cmValue");


--
-- TOC entry 5436 (class 2606 OID 190224)
-- Name: heights heights_cmValue_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key61" UNIQUE ("cmValue");


--
-- TOC entry 5438 (class 2606 OID 190126)
-- Name: heights heights_cmValue_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key62" UNIQUE ("cmValue");


--
-- TOC entry 5440 (class 2606 OID 190226)
-- Name: heights heights_cmValue_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key63" UNIQUE ("cmValue");


--
-- TOC entry 5442 (class 2606 OID 190228)
-- Name: heights heights_cmValue_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key64" UNIQUE ("cmValue");


--
-- TOC entry 5444 (class 2606 OID 190230)
-- Name: heights heights_cmValue_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key65" UNIQUE ("cmValue");


--
-- TOC entry 5446 (class 2606 OID 190310)
-- Name: heights heights_cmValue_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key66" UNIQUE ("cmValue");


--
-- TOC entry 5448 (class 2606 OID 190232)
-- Name: heights heights_cmValue_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key67" UNIQUE ("cmValue");


--
-- TOC entry 5450 (class 2606 OID 190308)
-- Name: heights heights_cmValue_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key68" UNIQUE ("cmValue");


--
-- TOC entry 5452 (class 2606 OID 190234)
-- Name: heights heights_cmValue_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key69" UNIQUE ("cmValue");


--
-- TOC entry 5454 (class 2606 OID 190162)
-- Name: heights heights_cmValue_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key7" UNIQUE ("cmValue");


--
-- TOC entry 5456 (class 2606 OID 190306)
-- Name: heights heights_cmValue_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key70" UNIQUE ("cmValue");


--
-- TOC entry 5458 (class 2606 OID 190236)
-- Name: heights heights_cmValue_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key71" UNIQUE ("cmValue");


--
-- TOC entry 5460 (class 2606 OID 190304)
-- Name: heights heights_cmValue_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key72" UNIQUE ("cmValue");


--
-- TOC entry 5462 (class 2606 OID 190302)
-- Name: heights heights_cmValue_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key73" UNIQUE ("cmValue");


--
-- TOC entry 5464 (class 2606 OID 190238)
-- Name: heights heights_cmValue_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key74" UNIQUE ("cmValue");


--
-- TOC entry 5466 (class 2606 OID 190240)
-- Name: heights heights_cmValue_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key75" UNIQUE ("cmValue");


--
-- TOC entry 5468 (class 2606 OID 190300)
-- Name: heights heights_cmValue_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key76" UNIQUE ("cmValue");


--
-- TOC entry 5470 (class 2606 OID 190242)
-- Name: heights heights_cmValue_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key77" UNIQUE ("cmValue");


--
-- TOC entry 5472 (class 2606 OID 190298)
-- Name: heights heights_cmValue_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key78" UNIQUE ("cmValue");


--
-- TOC entry 5474 (class 2606 OID 190244)
-- Name: heights heights_cmValue_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key79" UNIQUE ("cmValue");


--
-- TOC entry 5476 (class 2606 OID 190164)
-- Name: heights heights_cmValue_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key8" UNIQUE ("cmValue");


--
-- TOC entry 5478 (class 2606 OID 190296)
-- Name: heights heights_cmValue_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key80" UNIQUE ("cmValue");


--
-- TOC entry 5480 (class 2606 OID 190246)
-- Name: heights heights_cmValue_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key81" UNIQUE ("cmValue");


--
-- TOC entry 5482 (class 2606 OID 190294)
-- Name: heights heights_cmValue_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key82" UNIQUE ("cmValue");


--
-- TOC entry 5484 (class 2606 OID 190248)
-- Name: heights heights_cmValue_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key83" UNIQUE ("cmValue");


--
-- TOC entry 5486 (class 2606 OID 190292)
-- Name: heights heights_cmValue_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key84" UNIQUE ("cmValue");


--
-- TOC entry 5488 (class 2606 OID 190250)
-- Name: heights heights_cmValue_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key85" UNIQUE ("cmValue");


--
-- TOC entry 5490 (class 2606 OID 190290)
-- Name: heights heights_cmValue_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key86" UNIQUE ("cmValue");


--
-- TOC entry 5492 (class 2606 OID 190252)
-- Name: heights heights_cmValue_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key87" UNIQUE ("cmValue");


--
-- TOC entry 5494 (class 2606 OID 190288)
-- Name: heights heights_cmValue_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key88" UNIQUE ("cmValue");


--
-- TOC entry 5496 (class 2606 OID 190254)
-- Name: heights heights_cmValue_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key89" UNIQUE ("cmValue");


--
-- TOC entry 5498 (class 2606 OID 190144)
-- Name: heights heights_cmValue_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key9" UNIQUE ("cmValue");


--
-- TOC entry 5500 (class 2606 OID 190256)
-- Name: heights heights_cmValue_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key90" UNIQUE ("cmValue");


--
-- TOC entry 5502 (class 2606 OID 190286)
-- Name: heights heights_cmValue_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key91" UNIQUE ("cmValue");


--
-- TOC entry 5504 (class 2606 OID 190258)
-- Name: heights heights_cmValue_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key92" UNIQUE ("cmValue");


--
-- TOC entry 5506 (class 2606 OID 190284)
-- Name: heights heights_cmValue_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key93" UNIQUE ("cmValue");


--
-- TOC entry 5508 (class 2606 OID 190282)
-- Name: heights heights_cmValue_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key94" UNIQUE ("cmValue");


--
-- TOC entry 5510 (class 2606 OID 190260)
-- Name: heights heights_cmValue_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key95" UNIQUE ("cmValue");


--
-- TOC entry 5512 (class 2606 OID 190280)
-- Name: heights heights_cmValue_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key96" UNIQUE ("cmValue");


--
-- TOC entry 5514 (class 2606 OID 190262)
-- Name: heights heights_cmValue_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key97" UNIQUE ("cmValue");


--
-- TOC entry 5516 (class 2606 OID 190278)
-- Name: heights heights_cmValue_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key98" UNIQUE ("cmValue");


--
-- TOC entry 5518 (class 2606 OID 190276)
-- Name: heights heights_cmValue_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT "heights_cmValue_key99" UNIQUE ("cmValue");


--
-- TOC entry 5520 (class 2606 OID 17108)
-- Name: heights heights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heights
    ADD CONSTRAINT heights_pkey PRIMARY KEY (id);


--
-- TOC entry 6191 (class 2606 OID 19677)
-- Name: horoscope_details horoscope_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT horoscope_details_pkey PRIMARY KEY (id);


--
-- TOC entry 6193 (class 2606 OID 19679)
-- Name: horoscope_details horoscope_details_userProfileId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_userProfileId_key" UNIQUE ("userProfileId");


--
-- TOC entry 5530 (class 2606 OID 17180)
-- Name: income_ranges income_ranges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income_ranges
    ADD CONSTRAINT income_ranges_pkey PRIMARY KEY (id);


--
-- TOC entry 5879 (class 2606 OID 17431)
-- Name: interests interests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_pkey PRIMARY KEY (id);


--
-- TOC entry 6529 (class 2606 OID 190816)
-- Name: laknams laknams_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key UNIQUE (name);


--
-- TOC entry 6531 (class 2606 OID 190818)
-- Name: laknams laknams_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key1 UNIQUE (name);


--
-- TOC entry 6533 (class 2606 OID 190784)
-- Name: laknams laknams_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key10 UNIQUE (name);


--
-- TOC entry 6535 (class 2606 OID 190806)
-- Name: laknams laknams_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key11 UNIQUE (name);


--
-- TOC entry 6537 (class 2606 OID 190786)
-- Name: laknams laknams_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key12 UNIQUE (name);


--
-- TOC entry 6539 (class 2606 OID 190802)
-- Name: laknams laknams_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key13 UNIQUE (name);


--
-- TOC entry 6541 (class 2606 OID 190788)
-- Name: laknams laknams_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key14 UNIQUE (name);


--
-- TOC entry 6543 (class 2606 OID 190800)
-- Name: laknams laknams_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key15 UNIQUE (name);


--
-- TOC entry 6545 (class 2606 OID 190790)
-- Name: laknams laknams_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key16 UNIQUE (name);


--
-- TOC entry 6547 (class 2606 OID 190792)
-- Name: laknams laknams_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key17 UNIQUE (name);


--
-- TOC entry 6549 (class 2606 OID 190798)
-- Name: laknams laknams_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key18 UNIQUE (name);


--
-- TOC entry 6551 (class 2606 OID 190794)
-- Name: laknams laknams_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key19 UNIQUE (name);


--
-- TOC entry 6553 (class 2606 OID 190820)
-- Name: laknams laknams_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key2 UNIQUE (name);


--
-- TOC entry 6555 (class 2606 OID 190796)
-- Name: laknams laknams_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key20 UNIQUE (name);


--
-- TOC entry 6557 (class 2606 OID 190776)
-- Name: laknams laknams_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key21 UNIQUE (name);


--
-- TOC entry 6559 (class 2606 OID 190822)
-- Name: laknams laknams_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key22 UNIQUE (name);


--
-- TOC entry 6561 (class 2606 OID 190774)
-- Name: laknams laknams_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key23 UNIQUE (name);


--
-- TOC entry 6563 (class 2606 OID 190824)
-- Name: laknams laknams_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key24 UNIQUE (name);


--
-- TOC entry 6565 (class 2606 OID 190772)
-- Name: laknams laknams_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key25 UNIQUE (name);


--
-- TOC entry 6567 (class 2606 OID 190804)
-- Name: laknams laknams_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key26 UNIQUE (name);


--
-- TOC entry 6569 (class 2606 OID 190826)
-- Name: laknams laknams_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key27 UNIQUE (name);


--
-- TOC entry 6571 (class 2606 OID 190828)
-- Name: laknams laknams_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key28 UNIQUE (name);


--
-- TOC entry 6573 (class 2606 OID 190770)
-- Name: laknams laknams_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key29 UNIQUE (name);


--
-- TOC entry 6575 (class 2606 OID 190814)
-- Name: laknams laknams_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key3 UNIQUE (name);


--
-- TOC entry 6577 (class 2606 OID 190830)
-- Name: laknams laknams_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key30 UNIQUE (name);


--
-- TOC entry 6579 (class 2606 OID 190834)
-- Name: laknams laknams_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key31 UNIQUE (name);


--
-- TOC entry 6581 (class 2606 OID 190832)
-- Name: laknams laknams_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key32 UNIQUE (name);


--
-- TOC entry 6583 (class 2606 OID 190768)
-- Name: laknams laknams_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key33 UNIQUE (name);


--
-- TOC entry 6585 (class 2606 OID 190836)
-- Name: laknams laknams_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key34 UNIQUE (name);


--
-- TOC entry 6587 (class 2606 OID 190838)
-- Name: laknams laknams_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key35 UNIQUE (name);


--
-- TOC entry 6589 (class 2606 OID 190840)
-- Name: laknams laknams_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key36 UNIQUE (name);


--
-- TOC entry 6591 (class 2606 OID 190766)
-- Name: laknams laknams_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key37 UNIQUE (name);


--
-- TOC entry 6593 (class 2606 OID 190842)
-- Name: laknams laknams_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key38 UNIQUE (name);


--
-- TOC entry 6595 (class 2606 OID 190844)
-- Name: laknams laknams_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key39 UNIQUE (name);


--
-- TOC entry 6597 (class 2606 OID 190778)
-- Name: laknams laknams_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key4 UNIQUE (name);


--
-- TOC entry 6599 (class 2606 OID 190764)
-- Name: laknams laknams_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key40 UNIQUE (name);


--
-- TOC entry 6601 (class 2606 OID 190846)
-- Name: laknams laknams_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key41 UNIQUE (name);


--
-- TOC entry 6603 (class 2606 OID 190848)
-- Name: laknams laknams_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key42 UNIQUE (name);


--
-- TOC entry 6605 (class 2606 OID 190762)
-- Name: laknams laknams_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key43 UNIQUE (name);


--
-- TOC entry 6607 (class 2606 OID 190850)
-- Name: laknams laknams_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key44 UNIQUE (name);


--
-- TOC entry 6609 (class 2606 OID 190760)
-- Name: laknams laknams_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key45 UNIQUE (name);


--
-- TOC entry 6611 (class 2606 OID 190852)
-- Name: laknams laknams_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key46 UNIQUE (name);


--
-- TOC entry 6613 (class 2606 OID 190758)
-- Name: laknams laknams_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key47 UNIQUE (name);


--
-- TOC entry 6615 (class 2606 OID 190854)
-- Name: laknams laknams_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key48 UNIQUE (name);


--
-- TOC entry 6617 (class 2606 OID 190756)
-- Name: laknams laknams_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key49 UNIQUE (name);


--
-- TOC entry 6619 (class 2606 OID 190812)
-- Name: laknams laknams_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key5 UNIQUE (name);


--
-- TOC entry 6621 (class 2606 OID 190856)
-- Name: laknams laknams_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key50 UNIQUE (name);


--
-- TOC entry 6623 (class 2606 OID 190754)
-- Name: laknams laknams_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key51 UNIQUE (name);


--
-- TOC entry 6625 (class 2606 OID 190858)
-- Name: laknams laknams_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key52 UNIQUE (name);


--
-- TOC entry 6627 (class 2606 OID 190752)
-- Name: laknams laknams_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key53 UNIQUE (name);


--
-- TOC entry 6629 (class 2606 OID 190860)
-- Name: laknams laknams_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key54 UNIQUE (name);


--
-- TOC entry 6631 (class 2606 OID 190862)
-- Name: laknams laknams_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key55 UNIQUE (name);


--
-- TOC entry 6633 (class 2606 OID 190750)
-- Name: laknams laknams_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key56 UNIQUE (name);


--
-- TOC entry 6635 (class 2606 OID 190864)
-- Name: laknams laknams_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key57 UNIQUE (name);


--
-- TOC entry 6637 (class 2606 OID 190748)
-- Name: laknams laknams_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key58 UNIQUE (name);


--
-- TOC entry 6639 (class 2606 OID 190866)
-- Name: laknams laknams_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key59 UNIQUE (name);


--
-- TOC entry 6641 (class 2606 OID 190780)
-- Name: laknams laknams_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key6 UNIQUE (name);


--
-- TOC entry 6643 (class 2606 OID 190746)
-- Name: laknams laknams_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key60 UNIQUE (name);


--
-- TOC entry 6645 (class 2606 OID 190868)
-- Name: laknams laknams_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key61 UNIQUE (name);


--
-- TOC entry 6647 (class 2606 OID 190744)
-- Name: laknams laknams_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key62 UNIQUE (name);


--
-- TOC entry 6649 (class 2606 OID 190870)
-- Name: laknams laknams_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key63 UNIQUE (name);


--
-- TOC entry 6651 (class 2606 OID 190742)
-- Name: laknams laknams_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key64 UNIQUE (name);


--
-- TOC entry 6653 (class 2606 OID 190872)
-- Name: laknams laknams_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key65 UNIQUE (name);


--
-- TOC entry 6655 (class 2606 OID 190740)
-- Name: laknams laknams_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key66 UNIQUE (name);


--
-- TOC entry 6657 (class 2606 OID 190874)
-- Name: laknams laknams_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key67 UNIQUE (name);


--
-- TOC entry 6659 (class 2606 OID 190738)
-- Name: laknams laknams_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key68 UNIQUE (name);


--
-- TOC entry 6661 (class 2606 OID 190876)
-- Name: laknams laknams_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key69 UNIQUE (name);


--
-- TOC entry 6663 (class 2606 OID 190810)
-- Name: laknams laknams_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key7 UNIQUE (name);


--
-- TOC entry 6665 (class 2606 OID 190736)
-- Name: laknams laknams_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key70 UNIQUE (name);


--
-- TOC entry 6667 (class 2606 OID 190878)
-- Name: laknams laknams_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key71 UNIQUE (name);


--
-- TOC entry 6669 (class 2606 OID 190734)
-- Name: laknams laknams_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key72 UNIQUE (name);


--
-- TOC entry 6671 (class 2606 OID 190880)
-- Name: laknams laknams_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key73 UNIQUE (name);


--
-- TOC entry 6673 (class 2606 OID 190732)
-- Name: laknams laknams_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key74 UNIQUE (name);


--
-- TOC entry 6675 (class 2606 OID 190882)
-- Name: laknams laknams_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key75 UNIQUE (name);


--
-- TOC entry 6677 (class 2606 OID 190730)
-- Name: laknams laknams_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key76 UNIQUE (name);


--
-- TOC entry 6679 (class 2606 OID 190782)
-- Name: laknams laknams_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key8 UNIQUE (name);


--
-- TOC entry 6681 (class 2606 OID 190808)
-- Name: laknams laknams_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_name_key9 UNIQUE (name);


--
-- TOC entry 6683 (class 2606 OID 63943)
-- Name: laknams laknams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laknams
    ADD CONSTRAINT laknams_pkey PRIMARY KEY (id);


--
-- TOC entry 6195 (class 2606 OID 19739)
-- Name: location_lifestyle location_lifestyle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_lifestyle
    ADD CONSTRAINT location_lifestyle_pkey PRIMARY KEY (id);


--
-- TOC entry 6197 (class 2606 OID 19741)
-- Name: location_lifestyle location_lifestyle_userProfileId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_lifestyle
    ADD CONSTRAINT "location_lifestyle_userProfileId_key" UNIQUE ("userProfileId");


--
-- TOC entry 5883 (class 2606 OID 17456)
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- TOC entry 5887 (class 2606 OID 17482)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 5214 (class 2606 OID 17072)
-- Name: mother_tongues mother_tongues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mother_tongues
    ADD CONSTRAINT mother_tongues_pkey PRIMARY KEY (id);


--
-- TOC entry 6213 (class 2606 OID 58250)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 5526 (class 2606 OID 17151)
-- Name: occupations occupations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.occupations
    ADD CONSTRAINT occupations_pkey PRIMARY KEY (id);


--
-- TOC entry 5868 (class 2606 OID 17360)
-- Name: partner_preferences partner_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT partner_preferences_pkey PRIMARY KEY (id);


--
-- TOC entry 5870 (class 2606 OID 17362)
-- Name: partner_preferences partner_preferences_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_userId_key" UNIQUE ("userId");


--
-- TOC entry 5893 (class 2606 OID 17558)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 6841 (class 2606 OID 87877)
-- Name: phone_view_logs phone_view_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone_view_logs
    ADD CONSTRAINT phone_view_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 5889 (class 2606 OID 17507)
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- TOC entry 6215 (class 2606 OID 58272)
-- Name: profile_views profile_views_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_views
    ADD CONSTRAINT profile_views_pkey PRIMARY KEY (id);


--
-- TOC entry 6373 (class 2606 OID 190955)
-- Name: rasis rasis_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key UNIQUE (name);


--
-- TOC entry 6375 (class 2606 OID 190957)
-- Name: rasis rasis_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key1 UNIQUE (name);


--
-- TOC entry 6377 (class 2606 OID 190967)
-- Name: rasis rasis_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key10 UNIQUE (name);


--
-- TOC entry 6379 (class 2606 OID 190945)
-- Name: rasis rasis_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key11 UNIQUE (name);


--
-- TOC entry 6381 (class 2606 OID 190969)
-- Name: rasis rasis_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key12 UNIQUE (name);


--
-- TOC entry 6383 (class 2606 OID 190943)
-- Name: rasis rasis_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key13 UNIQUE (name);


--
-- TOC entry 6385 (class 2606 OID 190971)
-- Name: rasis rasis_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key14 UNIQUE (name);


--
-- TOC entry 6387 (class 2606 OID 190941)
-- Name: rasis rasis_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key15 UNIQUE (name);


--
-- TOC entry 6389 (class 2606 OID 190973)
-- Name: rasis rasis_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key16 UNIQUE (name);


--
-- TOC entry 6391 (class 2606 OID 190975)
-- Name: rasis rasis_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key17 UNIQUE (name);


--
-- TOC entry 6393 (class 2606 OID 190939)
-- Name: rasis rasis_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key18 UNIQUE (name);


--
-- TOC entry 6395 (class 2606 OID 190977)
-- Name: rasis rasis_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key19 UNIQUE (name);


--
-- TOC entry 6397 (class 2606 OID 190959)
-- Name: rasis rasis_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key2 UNIQUE (name);


--
-- TOC entry 6399 (class 2606 OID 190979)
-- Name: rasis rasis_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key20 UNIQUE (name);


--
-- TOC entry 6401 (class 2606 OID 190937)
-- Name: rasis rasis_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key21 UNIQUE (name);


--
-- TOC entry 6403 (class 2606 OID 190981)
-- Name: rasis rasis_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key22 UNIQUE (name);


--
-- TOC entry 6405 (class 2606 OID 190935)
-- Name: rasis rasis_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key23 UNIQUE (name);


--
-- TOC entry 6407 (class 2606 OID 190983)
-- Name: rasis rasis_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key24 UNIQUE (name);


--
-- TOC entry 6409 (class 2606 OID 190933)
-- Name: rasis rasis_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key25 UNIQUE (name);


--
-- TOC entry 6411 (class 2606 OID 190985)
-- Name: rasis rasis_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key26 UNIQUE (name);


--
-- TOC entry 6413 (class 2606 OID 190987)
-- Name: rasis rasis_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key27 UNIQUE (name);


--
-- TOC entry 6415 (class 2606 OID 190989)
-- Name: rasis rasis_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key28 UNIQUE (name);


--
-- TOC entry 6417 (class 2606 OID 190931)
-- Name: rasis rasis_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key29 UNIQUE (name);


--
-- TOC entry 6419 (class 2606 OID 190953)
-- Name: rasis rasis_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key3 UNIQUE (name);


--
-- TOC entry 6421 (class 2606 OID 190991)
-- Name: rasis rasis_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key30 UNIQUE (name);


--
-- TOC entry 6423 (class 2606 OID 190929)
-- Name: rasis rasis_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key31 UNIQUE (name);


--
-- TOC entry 6425 (class 2606 OID 190993)
-- Name: rasis rasis_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key32 UNIQUE (name);


--
-- TOC entry 6427 (class 2606 OID 190927)
-- Name: rasis rasis_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key33 UNIQUE (name);


--
-- TOC entry 6429 (class 2606 OID 190995)
-- Name: rasis rasis_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key34 UNIQUE (name);


--
-- TOC entry 6431 (class 2606 OID 190997)
-- Name: rasis rasis_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key35 UNIQUE (name);


--
-- TOC entry 6433 (class 2606 OID 190999)
-- Name: rasis rasis_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key36 UNIQUE (name);


--
-- TOC entry 6435 (class 2606 OID 190925)
-- Name: rasis rasis_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key37 UNIQUE (name);


--
-- TOC entry 6437 (class 2606 OID 191001)
-- Name: rasis rasis_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key38 UNIQUE (name);


--
-- TOC entry 6439 (class 2606 OID 191003)
-- Name: rasis rasis_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key39 UNIQUE (name);


--
-- TOC entry 6441 (class 2606 OID 190961)
-- Name: rasis rasis_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key4 UNIQUE (name);


--
-- TOC entry 6443 (class 2606 OID 190923)
-- Name: rasis rasis_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key40 UNIQUE (name);


--
-- TOC entry 6445 (class 2606 OID 191005)
-- Name: rasis rasis_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key41 UNIQUE (name);


--
-- TOC entry 6447 (class 2606 OID 191007)
-- Name: rasis rasis_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key42 UNIQUE (name);


--
-- TOC entry 6449 (class 2606 OID 190921)
-- Name: rasis rasis_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key43 UNIQUE (name);


--
-- TOC entry 6451 (class 2606 OID 191009)
-- Name: rasis rasis_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key44 UNIQUE (name);


--
-- TOC entry 6453 (class 2606 OID 190919)
-- Name: rasis rasis_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key45 UNIQUE (name);


--
-- TOC entry 6455 (class 2606 OID 191011)
-- Name: rasis rasis_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key46 UNIQUE (name);


--
-- TOC entry 6457 (class 2606 OID 190917)
-- Name: rasis rasis_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key47 UNIQUE (name);


--
-- TOC entry 6459 (class 2606 OID 191015)
-- Name: rasis rasis_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key48 UNIQUE (name);


--
-- TOC entry 6461 (class 2606 OID 190915)
-- Name: rasis rasis_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key49 UNIQUE (name);


--
-- TOC entry 6463 (class 2606 OID 190951)
-- Name: rasis rasis_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key5 UNIQUE (name);


--
-- TOC entry 6465 (class 2606 OID 191017)
-- Name: rasis rasis_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key50 UNIQUE (name);


--
-- TOC entry 6467 (class 2606 OID 190913)
-- Name: rasis rasis_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key51 UNIQUE (name);


--
-- TOC entry 6469 (class 2606 OID 191019)
-- Name: rasis rasis_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key52 UNIQUE (name);


--
-- TOC entry 6471 (class 2606 OID 190911)
-- Name: rasis rasis_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key53 UNIQUE (name);


--
-- TOC entry 6473 (class 2606 OID 191021)
-- Name: rasis rasis_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key54 UNIQUE (name);


--
-- TOC entry 6475 (class 2606 OID 191023)
-- Name: rasis rasis_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key55 UNIQUE (name);


--
-- TOC entry 6477 (class 2606 OID 190909)
-- Name: rasis rasis_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key56 UNIQUE (name);


--
-- TOC entry 6479 (class 2606 OID 191025)
-- Name: rasis rasis_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key57 UNIQUE (name);


--
-- TOC entry 6481 (class 2606 OID 190907)
-- Name: rasis rasis_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key58 UNIQUE (name);


--
-- TOC entry 6483 (class 2606 OID 191027)
-- Name: rasis rasis_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key59 UNIQUE (name);


--
-- TOC entry 6485 (class 2606 OID 190963)
-- Name: rasis rasis_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key6 UNIQUE (name);


--
-- TOC entry 6487 (class 2606 OID 190905)
-- Name: rasis rasis_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key60 UNIQUE (name);


--
-- TOC entry 6489 (class 2606 OID 191029)
-- Name: rasis rasis_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key61 UNIQUE (name);


--
-- TOC entry 6491 (class 2606 OID 190903)
-- Name: rasis rasis_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key62 UNIQUE (name);


--
-- TOC entry 6493 (class 2606 OID 191031)
-- Name: rasis rasis_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key63 UNIQUE (name);


--
-- TOC entry 6495 (class 2606 OID 190901)
-- Name: rasis rasis_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key64 UNIQUE (name);


--
-- TOC entry 6497 (class 2606 OID 191033)
-- Name: rasis rasis_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key65 UNIQUE (name);


--
-- TOC entry 6499 (class 2606 OID 190899)
-- Name: rasis rasis_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key66 UNIQUE (name);


--
-- TOC entry 6501 (class 2606 OID 191013)
-- Name: rasis rasis_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key67 UNIQUE (name);


--
-- TOC entry 6503 (class 2606 OID 190897)
-- Name: rasis rasis_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key68 UNIQUE (name);


--
-- TOC entry 6505 (class 2606 OID 191035)
-- Name: rasis rasis_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key69 UNIQUE (name);


--
-- TOC entry 6507 (class 2606 OID 190949)
-- Name: rasis rasis_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key7 UNIQUE (name);


--
-- TOC entry 6509 (class 2606 OID 190895)
-- Name: rasis rasis_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key70 UNIQUE (name);


--
-- TOC entry 6511 (class 2606 OID 191037)
-- Name: rasis rasis_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key71 UNIQUE (name);


--
-- TOC entry 6513 (class 2606 OID 190893)
-- Name: rasis rasis_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key72 UNIQUE (name);


--
-- TOC entry 6515 (class 2606 OID 191039)
-- Name: rasis rasis_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key73 UNIQUE (name);


--
-- TOC entry 6517 (class 2606 OID 190891)
-- Name: rasis rasis_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key74 UNIQUE (name);


--
-- TOC entry 6519 (class 2606 OID 191041)
-- Name: rasis rasis_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key75 UNIQUE (name);


--
-- TOC entry 6521 (class 2606 OID 190889)
-- Name: rasis rasis_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key76 UNIQUE (name);


--
-- TOC entry 6523 (class 2606 OID 190965)
-- Name: rasis rasis_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key8 UNIQUE (name);


--
-- TOC entry 6525 (class 2606 OID 190947)
-- Name: rasis rasis_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_name_key9 UNIQUE (name);


--
-- TOC entry 6527 (class 2606 OID 63931)
-- Name: rasis rasis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rasis
    ADD CONSTRAINT rasis_pkey PRIMARY KEY (id);


--
-- TOC entry 5216 (class 2606 OID 17082)
-- Name: religions religions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.religions
    ADD CONSTRAINT religions_pkey PRIMARY KEY (id);


--
-- TOC entry 5897 (class 2606 OID 17605)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- TOC entry 6217 (class 2606 OID 190482)
-- Name: stars stars_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key UNIQUE (name);


--
-- TOC entry 6219 (class 2606 OID 190484)
-- Name: stars stars_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key1 UNIQUE (name);


--
-- TOC entry 6221 (class 2606 OID 190494)
-- Name: stars stars_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key10 UNIQUE (name);


--
-- TOC entry 6223 (class 2606 OID 190472)
-- Name: stars stars_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key11 UNIQUE (name);


--
-- TOC entry 6225 (class 2606 OID 190496)
-- Name: stars stars_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key12 UNIQUE (name);


--
-- TOC entry 6227 (class 2606 OID 190470)
-- Name: stars stars_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key13 UNIQUE (name);


--
-- TOC entry 6229 (class 2606 OID 190498)
-- Name: stars stars_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key14 UNIQUE (name);


--
-- TOC entry 6231 (class 2606 OID 190468)
-- Name: stars stars_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key15 UNIQUE (name);


--
-- TOC entry 6233 (class 2606 OID 190500)
-- Name: stars stars_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key16 UNIQUE (name);


--
-- TOC entry 6235 (class 2606 OID 190502)
-- Name: stars stars_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key17 UNIQUE (name);


--
-- TOC entry 6237 (class 2606 OID 190464)
-- Name: stars stars_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key18 UNIQUE (name);


--
-- TOC entry 6239 (class 2606 OID 190504)
-- Name: stars stars_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key19 UNIQUE (name);


--
-- TOC entry 6241 (class 2606 OID 190486)
-- Name: stars stars_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key2 UNIQUE (name);


--
-- TOC entry 6243 (class 2606 OID 190506)
-- Name: stars stars_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key20 UNIQUE (name);


--
-- TOC entry 6245 (class 2606 OID 190462)
-- Name: stars stars_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key21 UNIQUE (name);


--
-- TOC entry 6247 (class 2606 OID 190508)
-- Name: stars stars_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key22 UNIQUE (name);


--
-- TOC entry 6249 (class 2606 OID 190460)
-- Name: stars stars_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key23 UNIQUE (name);


--
-- TOC entry 6251 (class 2606 OID 190510)
-- Name: stars stars_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key24 UNIQUE (name);


--
-- TOC entry 6253 (class 2606 OID 190458)
-- Name: stars stars_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key25 UNIQUE (name);


--
-- TOC entry 6255 (class 2606 OID 190456)
-- Name: stars stars_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key26 UNIQUE (name);


--
-- TOC entry 6257 (class 2606 OID 190512)
-- Name: stars stars_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key27 UNIQUE (name);


--
-- TOC entry 6259 (class 2606 OID 190514)
-- Name: stars stars_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key28 UNIQUE (name);


--
-- TOC entry 6261 (class 2606 OID 190454)
-- Name: stars stars_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key29 UNIQUE (name);


--
-- TOC entry 6263 (class 2606 OID 190480)
-- Name: stars stars_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key3 UNIQUE (name);


--
-- TOC entry 6265 (class 2606 OID 190516)
-- Name: stars stars_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key30 UNIQUE (name);


--
-- TOC entry 6267 (class 2606 OID 190452)
-- Name: stars stars_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key31 UNIQUE (name);


--
-- TOC entry 6269 (class 2606 OID 190518)
-- Name: stars stars_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key32 UNIQUE (name);


--
-- TOC entry 6271 (class 2606 OID 190450)
-- Name: stars stars_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key33 UNIQUE (name);


--
-- TOC entry 6273 (class 2606 OID 190520)
-- Name: stars stars_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key34 UNIQUE (name);


--
-- TOC entry 6275 (class 2606 OID 190522)
-- Name: stars stars_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key35 UNIQUE (name);


--
-- TOC entry 6277 (class 2606 OID 190524)
-- Name: stars stars_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key36 UNIQUE (name);


--
-- TOC entry 6279 (class 2606 OID 190448)
-- Name: stars stars_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key37 UNIQUE (name);


--
-- TOC entry 6281 (class 2606 OID 190526)
-- Name: stars stars_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key38 UNIQUE (name);


--
-- TOC entry 6283 (class 2606 OID 190528)
-- Name: stars stars_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key39 UNIQUE (name);


--
-- TOC entry 6285 (class 2606 OID 190488)
-- Name: stars stars_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key4 UNIQUE (name);


--
-- TOC entry 6287 (class 2606 OID 190446)
-- Name: stars stars_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key40 UNIQUE (name);


--
-- TOC entry 6289 (class 2606 OID 190530)
-- Name: stars stars_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key41 UNIQUE (name);


--
-- TOC entry 6291 (class 2606 OID 190532)
-- Name: stars stars_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key42 UNIQUE (name);


--
-- TOC entry 6293 (class 2606 OID 190444)
-- Name: stars stars_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key43 UNIQUE (name);


--
-- TOC entry 6295 (class 2606 OID 190534)
-- Name: stars stars_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key44 UNIQUE (name);


--
-- TOC entry 6297 (class 2606 OID 190442)
-- Name: stars stars_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key45 UNIQUE (name);


--
-- TOC entry 6299 (class 2606 OID 190536)
-- Name: stars stars_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key46 UNIQUE (name);


--
-- TOC entry 6301 (class 2606 OID 190440)
-- Name: stars stars_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key47 UNIQUE (name);


--
-- TOC entry 6303 (class 2606 OID 190538)
-- Name: stars stars_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key48 UNIQUE (name);


--
-- TOC entry 6305 (class 2606 OID 190438)
-- Name: stars stars_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key49 UNIQUE (name);


--
-- TOC entry 6307 (class 2606 OID 190478)
-- Name: stars stars_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key5 UNIQUE (name);


--
-- TOC entry 6309 (class 2606 OID 190540)
-- Name: stars stars_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key50 UNIQUE (name);


--
-- TOC entry 6311 (class 2606 OID 190436)
-- Name: stars stars_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key51 UNIQUE (name);


--
-- TOC entry 6313 (class 2606 OID 190542)
-- Name: stars stars_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key52 UNIQUE (name);


--
-- TOC entry 6315 (class 2606 OID 190434)
-- Name: stars stars_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key53 UNIQUE (name);


--
-- TOC entry 6317 (class 2606 OID 190544)
-- Name: stars stars_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key54 UNIQUE (name);


--
-- TOC entry 6319 (class 2606 OID 190546)
-- Name: stars stars_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key55 UNIQUE (name);


--
-- TOC entry 6321 (class 2606 OID 190432)
-- Name: stars stars_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key56 UNIQUE (name);


--
-- TOC entry 6323 (class 2606 OID 190548)
-- Name: stars stars_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key57 UNIQUE (name);


--
-- TOC entry 6325 (class 2606 OID 190430)
-- Name: stars stars_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key58 UNIQUE (name);


--
-- TOC entry 6327 (class 2606 OID 190550)
-- Name: stars stars_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key59 UNIQUE (name);


--
-- TOC entry 6329 (class 2606 OID 190490)
-- Name: stars stars_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key6 UNIQUE (name);


--
-- TOC entry 6331 (class 2606 OID 190428)
-- Name: stars stars_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key60 UNIQUE (name);


--
-- TOC entry 6333 (class 2606 OID 190552)
-- Name: stars stars_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key61 UNIQUE (name);


--
-- TOC entry 6335 (class 2606 OID 190426)
-- Name: stars stars_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key62 UNIQUE (name);


--
-- TOC entry 6337 (class 2606 OID 190554)
-- Name: stars stars_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key63 UNIQUE (name);


--
-- TOC entry 6339 (class 2606 OID 190424)
-- Name: stars stars_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key64 UNIQUE (name);


--
-- TOC entry 6341 (class 2606 OID 190556)
-- Name: stars stars_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key65 UNIQUE (name);


--
-- TOC entry 6343 (class 2606 OID 190422)
-- Name: stars stars_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key66 UNIQUE (name);


--
-- TOC entry 6345 (class 2606 OID 190466)
-- Name: stars stars_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key67 UNIQUE (name);


--
-- TOC entry 6347 (class 2606 OID 190420)
-- Name: stars stars_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key68 UNIQUE (name);


--
-- TOC entry 6349 (class 2606 OID 190558)
-- Name: stars stars_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key69 UNIQUE (name);


--
-- TOC entry 6351 (class 2606 OID 190476)
-- Name: stars stars_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key7 UNIQUE (name);


--
-- TOC entry 6353 (class 2606 OID 190418)
-- Name: stars stars_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key70 UNIQUE (name);


--
-- TOC entry 6355 (class 2606 OID 190560)
-- Name: stars stars_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key71 UNIQUE (name);


--
-- TOC entry 6357 (class 2606 OID 190416)
-- Name: stars stars_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key72 UNIQUE (name);


--
-- TOC entry 6359 (class 2606 OID 190562)
-- Name: stars stars_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key73 UNIQUE (name);


--
-- TOC entry 6361 (class 2606 OID 190414)
-- Name: stars stars_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key74 UNIQUE (name);


--
-- TOC entry 6363 (class 2606 OID 190564)
-- Name: stars stars_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key75 UNIQUE (name);


--
-- TOC entry 6365 (class 2606 OID 190412)
-- Name: stars stars_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key76 UNIQUE (name);


--
-- TOC entry 6367 (class 2606 OID 190492)
-- Name: stars stars_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key8 UNIQUE (name);


--
-- TOC entry 6369 (class 2606 OID 190474)
-- Name: stars stars_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_name_key9 UNIQUE (name);


--
-- TOC entry 6371 (class 2606 OID 63919)
-- Name: stars stars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_pkey PRIMARY KEY (id);


--
-- TOC entry 5210 (class 2606 OID 17041)
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- TOC entry 5891 (class 2606 OID 17527)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 5899 (class 2606 OID 17635)
-- Name: success_stories success_stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT success_stories_pkey PRIMARY KEY (id);


--
-- TOC entry 5901 (class 2606 OID 18934)
-- Name: user_drafts user_drafts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT user_drafts_pkey PRIMARY KEY (id);


--
-- TOC entry 5903 (class 2606 OID 191747)
-- Name: user_drafts user_drafts_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key" UNIQUE ("userId");


--
-- TOC entry 5905 (class 2606 OID 191749)
-- Name: user_drafts user_drafts_userId_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key1" UNIQUE ("userId");


--
-- TOC entry 5907 (class 2606 OID 191707)
-- Name: user_drafts user_drafts_userId_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key10" UNIQUE ("userId");


--
-- TOC entry 5909 (class 2606 OID 191761)
-- Name: user_drafts user_drafts_userId_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key100" UNIQUE ("userId");


--
-- TOC entry 5911 (class 2606 OID 191557)
-- Name: user_drafts user_drafts_userId_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key101" UNIQUE ("userId");


--
-- TOC entry 5913 (class 2606 OID 191763)
-- Name: user_drafts user_drafts_userId_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key102" UNIQUE ("userId");


--
-- TOC entry 5915 (class 2606 OID 191765)
-- Name: user_drafts user_drafts_userId_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key103" UNIQUE ("userId");


--
-- TOC entry 5917 (class 2606 OID 191767)
-- Name: user_drafts user_drafts_userId_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key104" UNIQUE ("userId");


--
-- TOC entry 5919 (class 2606 OID 191555)
-- Name: user_drafts user_drafts_userId_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key105" UNIQUE ("userId");


--
-- TOC entry 5921 (class 2606 OID 191769)
-- Name: user_drafts user_drafts_userId_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key106" UNIQUE ("userId");


--
-- TOC entry 5923 (class 2606 OID 191771)
-- Name: user_drafts user_drafts_userId_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key107" UNIQUE ("userId");


--
-- TOC entry 5925 (class 2606 OID 191553)
-- Name: user_drafts user_drafts_userId_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key108" UNIQUE ("userId");


--
-- TOC entry 5927 (class 2606 OID 191773)
-- Name: user_drafts user_drafts_userId_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key109" UNIQUE ("userId");


--
-- TOC entry 5929 (class 2606 OID 191731)
-- Name: user_drafts user_drafts_userId_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key11" UNIQUE ("userId");


--
-- TOC entry 5931 (class 2606 OID 191551)
-- Name: user_drafts user_drafts_userId_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key110" UNIQUE ("userId");


--
-- TOC entry 5933 (class 2606 OID 191549)
-- Name: user_drafts user_drafts_userId_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key111" UNIQUE ("userId");


--
-- TOC entry 5935 (class 2606 OID 191775)
-- Name: user_drafts user_drafts_userId_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key112" UNIQUE ("userId");


--
-- TOC entry 5937 (class 2606 OID 191547)
-- Name: user_drafts user_drafts_userId_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key113" UNIQUE ("userId");


--
-- TOC entry 5939 (class 2606 OID 191777)
-- Name: user_drafts user_drafts_userId_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key114" UNIQUE ("userId");


--
-- TOC entry 5941 (class 2606 OID 191545)
-- Name: user_drafts user_drafts_userId_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key115" UNIQUE ("userId");


--
-- TOC entry 5943 (class 2606 OID 191779)
-- Name: user_drafts user_drafts_userId_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key116" UNIQUE ("userId");


--
-- TOC entry 5945 (class 2606 OID 191543)
-- Name: user_drafts user_drafts_userId_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key117" UNIQUE ("userId");


--
-- TOC entry 5947 (class 2606 OID 191781)
-- Name: user_drafts user_drafts_userId_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key118" UNIQUE ("userId");


--
-- TOC entry 5949 (class 2606 OID 191541)
-- Name: user_drafts user_drafts_userId_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key119" UNIQUE ("userId");


--
-- TOC entry 5951 (class 2606 OID 191729)
-- Name: user_drafts user_drafts_userId_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key12" UNIQUE ("userId");


--
-- TOC entry 5953 (class 2606 OID 191783)
-- Name: user_drafts user_drafts_userId_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key120" UNIQUE ("userId");


--
-- TOC entry 5955 (class 2606 OID 191785)
-- Name: user_drafts user_drafts_userId_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key121" UNIQUE ("userId");


--
-- TOC entry 5957 (class 2606 OID 191539)
-- Name: user_drafts user_drafts_userId_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key122" UNIQUE ("userId");


--
-- TOC entry 5959 (class 2606 OID 191787)
-- Name: user_drafts user_drafts_userId_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key123" UNIQUE ("userId");


--
-- TOC entry 5961 (class 2606 OID 191537)
-- Name: user_drafts user_drafts_userId_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key124" UNIQUE ("userId");


--
-- TOC entry 5963 (class 2606 OID 191789)
-- Name: user_drafts user_drafts_userId_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key125" UNIQUE ("userId");


--
-- TOC entry 5965 (class 2606 OID 191535)
-- Name: user_drafts user_drafts_userId_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key126" UNIQUE ("userId");


--
-- TOC entry 5967 (class 2606 OID 191791)
-- Name: user_drafts user_drafts_userId_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key127" UNIQUE ("userId");


--
-- TOC entry 5969 (class 2606 OID 191533)
-- Name: user_drafts user_drafts_userId_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key128" UNIQUE ("userId");


--
-- TOC entry 5971 (class 2606 OID 191793)
-- Name: user_drafts user_drafts_userId_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key129" UNIQUE ("userId");


--
-- TOC entry 5973 (class 2606 OID 191709)
-- Name: user_drafts user_drafts_userId_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key13" UNIQUE ("userId");


--
-- TOC entry 5975 (class 2606 OID 191531)
-- Name: user_drafts user_drafts_userId_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key130" UNIQUE ("userId");


--
-- TOC entry 5977 (class 2606 OID 191795)
-- Name: user_drafts user_drafts_userId_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key131" UNIQUE ("userId");


--
-- TOC entry 5979 (class 2606 OID 191529)
-- Name: user_drafts user_drafts_userId_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key132" UNIQUE ("userId");


--
-- TOC entry 5981 (class 2606 OID 191623)
-- Name: user_drafts user_drafts_userId_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key133" UNIQUE ("userId");


--
-- TOC entry 5983 (class 2606 OID 191797)
-- Name: user_drafts user_drafts_userId_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key134" UNIQUE ("userId");


--
-- TOC entry 5985 (class 2606 OID 191527)
-- Name: user_drafts user_drafts_userId_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key135" UNIQUE ("userId");


--
-- TOC entry 5987 (class 2606 OID 191799)
-- Name: user_drafts user_drafts_userId_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key136" UNIQUE ("userId");


--
-- TOC entry 5989 (class 2606 OID 191525)
-- Name: user_drafts user_drafts_userId_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key137" UNIQUE ("userId");


--
-- TOC entry 5991 (class 2606 OID 191801)
-- Name: user_drafts user_drafts_userId_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key138" UNIQUE ("userId");


--
-- TOC entry 5993 (class 2606 OID 191523)
-- Name: user_drafts user_drafts_userId_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key139" UNIQUE ("userId");


--
-- TOC entry 5995 (class 2606 OID 191711)
-- Name: user_drafts user_drafts_userId_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key14" UNIQUE ("userId");


--
-- TOC entry 5997 (class 2606 OID 191803)
-- Name: user_drafts user_drafts_userId_key140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key140" UNIQUE ("userId");


--
-- TOC entry 5999 (class 2606 OID 191521)
-- Name: user_drafts user_drafts_userId_key141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key141" UNIQUE ("userId");


--
-- TOC entry 6001 (class 2606 OID 191713)
-- Name: user_drafts user_drafts_userId_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key15" UNIQUE ("userId");


--
-- TOC entry 6003 (class 2606 OID 191715)
-- Name: user_drafts user_drafts_userId_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key16" UNIQUE ("userId");


--
-- TOC entry 6005 (class 2606 OID 191727)
-- Name: user_drafts user_drafts_userId_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key17" UNIQUE ("userId");


--
-- TOC entry 6007 (class 2606 OID 191717)
-- Name: user_drafts user_drafts_userId_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key18" UNIQUE ("userId");


--
-- TOC entry 6009 (class 2606 OID 191719)
-- Name: user_drafts user_drafts_userId_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key19" UNIQUE ("userId");


--
-- TOC entry 6011 (class 2606 OID 191745)
-- Name: user_drafts user_drafts_userId_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key2" UNIQUE ("userId");


--
-- TOC entry 6013 (class 2606 OID 191725)
-- Name: user_drafts user_drafts_userId_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key20" UNIQUE ("userId");


--
-- TOC entry 6015 (class 2606 OID 191573)
-- Name: user_drafts user_drafts_userId_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key21" UNIQUE ("userId");


--
-- TOC entry 6017 (class 2606 OID 191721)
-- Name: user_drafts user_drafts_userId_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key22" UNIQUE ("userId");


--
-- TOC entry 6019 (class 2606 OID 191723)
-- Name: user_drafts user_drafts_userId_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key23" UNIQUE ("userId");


--
-- TOC entry 6021 (class 2606 OID 191571)
-- Name: user_drafts user_drafts_userId_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key24" UNIQUE ("userId");


--
-- TOC entry 6023 (class 2606 OID 191589)
-- Name: user_drafts user_drafts_userId_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key25" UNIQUE ("userId");


--
-- TOC entry 6025 (class 2606 OID 191569)
-- Name: user_drafts user_drafts_userId_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key26" UNIQUE ("userId");


--
-- TOC entry 6027 (class 2606 OID 191591)
-- Name: user_drafts user_drafts_userId_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key27" UNIQUE ("userId");


--
-- TOC entry 6029 (class 2606 OID 191701)
-- Name: user_drafts user_drafts_userId_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key28" UNIQUE ("userId");


--
-- TOC entry 6031 (class 2606 OID 191593)
-- Name: user_drafts user_drafts_userId_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key29" UNIQUE ("userId");


--
-- TOC entry 6033 (class 2606 OID 191751)
-- Name: user_drafts user_drafts_userId_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key3" UNIQUE ("userId");


--
-- TOC entry 6035 (class 2606 OID 191697)
-- Name: user_drafts user_drafts_userId_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key30" UNIQUE ("userId");


--
-- TOC entry 6037 (class 2606 OID 191737)
-- Name: user_drafts user_drafts_userId_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key31" UNIQUE ("userId");


--
-- TOC entry 6039 (class 2606 OID 191741)
-- Name: user_drafts user_drafts_userId_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key32" UNIQUE ("userId");


--
-- TOC entry 6041 (class 2606 OID 191739)
-- Name: user_drafts user_drafts_userId_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key33" UNIQUE ("userId");


--
-- TOC entry 6043 (class 2606 OID 191595)
-- Name: user_drafts user_drafts_userId_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key34" UNIQUE ("userId");


--
-- TOC entry 6045 (class 2606 OID 191695)
-- Name: user_drafts user_drafts_userId_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key35" UNIQUE ("userId");


--
-- TOC entry 6047 (class 2606 OID 191597)
-- Name: user_drafts user_drafts_userId_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key36" UNIQUE ("userId");


--
-- TOC entry 6049 (class 2606 OID 191693)
-- Name: user_drafts user_drafts_userId_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key37" UNIQUE ("userId");


--
-- TOC entry 6051 (class 2606 OID 191603)
-- Name: user_drafts user_drafts_userId_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key38" UNIQUE ("userId");


--
-- TOC entry 6053 (class 2606 OID 191605)
-- Name: user_drafts user_drafts_userId_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key39" UNIQUE ("userId");


--
-- TOC entry 6055 (class 2606 OID 191753)
-- Name: user_drafts user_drafts_userId_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key4" UNIQUE ("userId");


--
-- TOC entry 6057 (class 2606 OID 191607)
-- Name: user_drafts user_drafts_userId_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key40" UNIQUE ("userId");


--
-- TOC entry 6059 (class 2606 OID 191691)
-- Name: user_drafts user_drafts_userId_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key41" UNIQUE ("userId");


--
-- TOC entry 6061 (class 2606 OID 191689)
-- Name: user_drafts user_drafts_userId_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key42" UNIQUE ("userId");


--
-- TOC entry 6063 (class 2606 OID 191609)
-- Name: user_drafts user_drafts_userId_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key43" UNIQUE ("userId");


--
-- TOC entry 6065 (class 2606 OID 191611)
-- Name: user_drafts user_drafts_userId_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key44" UNIQUE ("userId");


--
-- TOC entry 6067 (class 2606 OID 191687)
-- Name: user_drafts user_drafts_userId_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key45" UNIQUE ("userId");


--
-- TOC entry 6069 (class 2606 OID 191685)
-- Name: user_drafts user_drafts_userId_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key46" UNIQUE ("userId");


--
-- TOC entry 6071 (class 2606 OID 191699)
-- Name: user_drafts user_drafts_userId_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key47" UNIQUE ("userId");


--
-- TOC entry 6073 (class 2606 OID 191613)
-- Name: user_drafts user_drafts_userId_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key48" UNIQUE ("userId");


--
-- TOC entry 6075 (class 2606 OID 191615)
-- Name: user_drafts user_drafts_userId_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key49" UNIQUE ("userId");


--
-- TOC entry 6077 (class 2606 OID 191743)
-- Name: user_drafts user_drafts_userId_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key5" UNIQUE ("userId");


--
-- TOC entry 6079 (class 2606 OID 191683)
-- Name: user_drafts user_drafts_userId_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key50" UNIQUE ("userId");


--
-- TOC entry 6081 (class 2606 OID 191617)
-- Name: user_drafts user_drafts_userId_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key51" UNIQUE ("userId");


--
-- TOC entry 6083 (class 2606 OID 191681)
-- Name: user_drafts user_drafts_userId_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key52" UNIQUE ("userId");


--
-- TOC entry 6085 (class 2606 OID 191581)
-- Name: user_drafts user_drafts_userId_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key53" UNIQUE ("userId");


--
-- TOC entry 6087 (class 2606 OID 191583)
-- Name: user_drafts user_drafts_userId_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key54" UNIQUE ("userId");


--
-- TOC entry 6089 (class 2606 OID 191679)
-- Name: user_drafts user_drafts_userId_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key55" UNIQUE ("userId");


--
-- TOC entry 6091 (class 2606 OID 191585)
-- Name: user_drafts user_drafts_userId_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key56" UNIQUE ("userId");


--
-- TOC entry 6093 (class 2606 OID 191677)
-- Name: user_drafts user_drafts_userId_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key57" UNIQUE ("userId");


--
-- TOC entry 6095 (class 2606 OID 191587)
-- Name: user_drafts user_drafts_userId_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key58" UNIQUE ("userId");


--
-- TOC entry 6097 (class 2606 OID 191635)
-- Name: user_drafts user_drafts_userId_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key59" UNIQUE ("userId");


--
-- TOC entry 6099 (class 2606 OID 191703)
-- Name: user_drafts user_drafts_userId_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key6" UNIQUE ("userId");


--
-- TOC entry 6101 (class 2606 OID 191637)
-- Name: user_drafts user_drafts_userId_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key60" UNIQUE ("userId");


--
-- TOC entry 6103 (class 2606 OID 191675)
-- Name: user_drafts user_drafts_userId_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key61" UNIQUE ("userId");


--
-- TOC entry 6105 (class 2606 OID 191639)
-- Name: user_drafts user_drafts_userId_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key62" UNIQUE ("userId");


--
-- TOC entry 6107 (class 2606 OID 191673)
-- Name: user_drafts user_drafts_userId_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key63" UNIQUE ("userId");


--
-- TOC entry 6109 (class 2606 OID 191641)
-- Name: user_drafts user_drafts_userId_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key64" UNIQUE ("userId");


--
-- TOC entry 6111 (class 2606 OID 191671)
-- Name: user_drafts user_drafts_userId_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key65" UNIQUE ("userId");


--
-- TOC entry 6113 (class 2606 OID 191643)
-- Name: user_drafts user_drafts_userId_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key66" UNIQUE ("userId");


--
-- TOC entry 6115 (class 2606 OID 191669)
-- Name: user_drafts user_drafts_userId_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key67" UNIQUE ("userId");


--
-- TOC entry 6117 (class 2606 OID 191667)
-- Name: user_drafts user_drafts_userId_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key68" UNIQUE ("userId");


--
-- TOC entry 6119 (class 2606 OID 191645)
-- Name: user_drafts user_drafts_userId_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key69" UNIQUE ("userId");


--
-- TOC entry 6121 (class 2606 OID 191735)
-- Name: user_drafts user_drafts_userId_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key7" UNIQUE ("userId");


--
-- TOC entry 6123 (class 2606 OID 191647)
-- Name: user_drafts user_drafts_userId_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key70" UNIQUE ("userId");


--
-- TOC entry 6125 (class 2606 OID 191665)
-- Name: user_drafts user_drafts_userId_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key71" UNIQUE ("userId");


--
-- TOC entry 6127 (class 2606 OID 191649)
-- Name: user_drafts user_drafts_userId_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key72" UNIQUE ("userId");


--
-- TOC entry 6129 (class 2606 OID 191663)
-- Name: user_drafts user_drafts_userId_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key73" UNIQUE ("userId");


--
-- TOC entry 6131 (class 2606 OID 191653)
-- Name: user_drafts user_drafts_userId_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key74" UNIQUE ("userId");


--
-- TOC entry 6133 (class 2606 OID 191661)
-- Name: user_drafts user_drafts_userId_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key75" UNIQUE ("userId");


--
-- TOC entry 6135 (class 2606 OID 191655)
-- Name: user_drafts user_drafts_userId_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key76" UNIQUE ("userId");


--
-- TOC entry 6137 (class 2606 OID 191659)
-- Name: user_drafts user_drafts_userId_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key77" UNIQUE ("userId");


--
-- TOC entry 6139 (class 2606 OID 191657)
-- Name: user_drafts user_drafts_userId_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key78" UNIQUE ("userId");


--
-- TOC entry 6141 (class 2606 OID 191601)
-- Name: user_drafts user_drafts_userId_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key79" UNIQUE ("userId");


--
-- TOC entry 6143 (class 2606 OID 191733)
-- Name: user_drafts user_drafts_userId_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key8" UNIQUE ("userId");


--
-- TOC entry 6145 (class 2606 OID 191599)
-- Name: user_drafts user_drafts_userId_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key80" UNIQUE ("userId");


--
-- TOC entry 6147 (class 2606 OID 191579)
-- Name: user_drafts user_drafts_userId_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key81" UNIQUE ("userId");


--
-- TOC entry 6149 (class 2606 OID 191619)
-- Name: user_drafts user_drafts_userId_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key82" UNIQUE ("userId");


--
-- TOC entry 6151 (class 2606 OID 191577)
-- Name: user_drafts user_drafts_userId_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key83" UNIQUE ("userId");


--
-- TOC entry 6153 (class 2606 OID 191621)
-- Name: user_drafts user_drafts_userId_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key84" UNIQUE ("userId");


--
-- TOC entry 6155 (class 2606 OID 191625)
-- Name: user_drafts user_drafts_userId_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key85" UNIQUE ("userId");


--
-- TOC entry 6157 (class 2606 OID 191575)
-- Name: user_drafts user_drafts_userId_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key86" UNIQUE ("userId");


--
-- TOC entry 6159 (class 2606 OID 191627)
-- Name: user_drafts user_drafts_userId_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key87" UNIQUE ("userId");


--
-- TOC entry 6161 (class 2606 OID 191629)
-- Name: user_drafts user_drafts_userId_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key88" UNIQUE ("userId");


--
-- TOC entry 6163 (class 2606 OID 191567)
-- Name: user_drafts user_drafts_userId_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key89" UNIQUE ("userId");


--
-- TOC entry 6165 (class 2606 OID 191705)
-- Name: user_drafts user_drafts_userId_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key9" UNIQUE ("userId");


--
-- TOC entry 6167 (class 2606 OID 191631)
-- Name: user_drafts user_drafts_userId_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key90" UNIQUE ("userId");


--
-- TOC entry 6169 (class 2606 OID 191565)
-- Name: user_drafts user_drafts_userId_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key91" UNIQUE ("userId");


--
-- TOC entry 6171 (class 2606 OID 191633)
-- Name: user_drafts user_drafts_userId_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key92" UNIQUE ("userId");


--
-- TOC entry 6173 (class 2606 OID 191563)
-- Name: user_drafts user_drafts_userId_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key93" UNIQUE ("userId");


--
-- TOC entry 6175 (class 2606 OID 191651)
-- Name: user_drafts user_drafts_userId_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key94" UNIQUE ("userId");


--
-- TOC entry 6177 (class 2606 OID 191755)
-- Name: user_drafts user_drafts_userId_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key95" UNIQUE ("userId");


--
-- TOC entry 6179 (class 2606 OID 191757)
-- Name: user_drafts user_drafts_userId_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key96" UNIQUE ("userId");


--
-- TOC entry 6181 (class 2606 OID 191561)
-- Name: user_drafts user_drafts_userId_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key97" UNIQUE ("userId");


--
-- TOC entry 6183 (class 2606 OID 191759)
-- Name: user_drafts user_drafts_userId_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key98" UNIQUE ("userId");


--
-- TOC entry 6185 (class 2606 OID 191559)
-- Name: user_drafts user_drafts_userId_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_drafts
    ADD CONSTRAINT "user_drafts_userId_key99" UNIQUE ("userId");


--
-- TOC entry 5872 (class 2606 OID 17406)
-- Name: user_photos user_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_photos
    ADD CONSTRAINT user_photos_pkey PRIMARY KEY (id);


--
-- TOC entry 6207 (class 2606 OID 20067)
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (id);


--
-- TOC entry 6209 (class 2606 OID 20069)
-- Name: user_preferences user_preferences_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_userId_key" UNIQUE ("userId");


--
-- TOC entry 5864 (class 2606 OID 17285)
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 5866 (class 2606 OID 17287)
-- Name: user_profiles user_profiles_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_userId_key" UNIQUE ("userId");


--
-- TOC entry 5532 (class 2606 OID 191101)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5534 (class 2606 OID 191099)
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- TOC entry 5536 (class 2606 OID 191113)
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- TOC entry 5538 (class 2606 OID 191197)
-- Name: users users_email_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key100 UNIQUE (email);


--
-- TOC entry 5540 (class 2606 OID 191219)
-- Name: users users_email_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key101 UNIQUE (email);


--
-- TOC entry 5542 (class 2606 OID 191199)
-- Name: users users_email_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key102 UNIQUE (email);


--
-- TOC entry 5544 (class 2606 OID 191201)
-- Name: users users_email_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key103 UNIQUE (email);


--
-- TOC entry 5546 (class 2606 OID 191217)
-- Name: users users_email_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key104 UNIQUE (email);


--
-- TOC entry 5548 (class 2606 OID 191203)
-- Name: users users_email_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key105 UNIQUE (email);


--
-- TOC entry 5550 (class 2606 OID 191215)
-- Name: users users_email_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key106 UNIQUE (email);


--
-- TOC entry 5552 (class 2606 OID 191205)
-- Name: users users_email_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key107 UNIQUE (email);


--
-- TOC entry 5554 (class 2606 OID 191213)
-- Name: users users_email_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key108 UNIQUE (email);


--
-- TOC entry 5556 (class 2606 OID 191207)
-- Name: users users_email_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key109 UNIQUE (email);


--
-- TOC entry 5558 (class 2606 OID 191115)
-- Name: users users_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);


--
-- TOC entry 5560 (class 2606 OID 191211)
-- Name: users users_email_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key110 UNIQUE (email);


--
-- TOC entry 5562 (class 2606 OID 191209)
-- Name: users users_email_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key111 UNIQUE (email);


--
-- TOC entry 5564 (class 2606 OID 191321)
-- Name: users users_email_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key112 UNIQUE (email);


--
-- TOC entry 5566 (class 2606 OID 191095)
-- Name: users users_email_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key113 UNIQUE (email);


--
-- TOC entry 5568 (class 2606 OID 191323)
-- Name: users users_email_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key114 UNIQUE (email);


--
-- TOC entry 5570 (class 2606 OID 191093)
-- Name: users users_email_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key115 UNIQUE (email);


--
-- TOC entry 5572 (class 2606 OID 191325)
-- Name: users users_email_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key116 UNIQUE (email);


--
-- TOC entry 5574 (class 2606 OID 191091)
-- Name: users users_email_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key117 UNIQUE (email);


--
-- TOC entry 5576 (class 2606 OID 191327)
-- Name: users users_email_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key118 UNIQUE (email);


--
-- TOC entry 5578 (class 2606 OID 191329)
-- Name: users users_email_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key119 UNIQUE (email);


--
-- TOC entry 5580 (class 2606 OID 191315)
-- Name: users users_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key12 UNIQUE (email);


--
-- TOC entry 5582 (class 2606 OID 191331)
-- Name: users users_email_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key120 UNIQUE (email);


--
-- TOC entry 5584 (class 2606 OID 191089)
-- Name: users users_email_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key121 UNIQUE (email);


--
-- TOC entry 5586 (class 2606 OID 191333)
-- Name: users users_email_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key122 UNIQUE (email);


--
-- TOC entry 5588 (class 2606 OID 191335)
-- Name: users users_email_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key123 UNIQUE (email);


--
-- TOC entry 5590 (class 2606 OID 191337)
-- Name: users users_email_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key124 UNIQUE (email);


--
-- TOC entry 5592 (class 2606 OID 191087)
-- Name: users users_email_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key125 UNIQUE (email);


--
-- TOC entry 5594 (class 2606 OID 191339)
-- Name: users users_email_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key126 UNIQUE (email);


--
-- TOC entry 5596 (class 2606 OID 191341)
-- Name: users users_email_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key127 UNIQUE (email);


--
-- TOC entry 5598 (class 2606 OID 191343)
-- Name: users users_email_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key128 UNIQUE (email);


--
-- TOC entry 5600 (class 2606 OID 191085)
-- Name: users users_email_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key129 UNIQUE (email);


--
-- TOC entry 5602 (class 2606 OID 191117)
-- Name: users users_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key13 UNIQUE (email);


--
-- TOC entry 5604 (class 2606 OID 191345)
-- Name: users users_email_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key130 UNIQUE (email);


--
-- TOC entry 5606 (class 2606 OID 191347)
-- Name: users users_email_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key131 UNIQUE (email);


--
-- TOC entry 5608 (class 2606 OID 191083)
-- Name: users users_email_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key132 UNIQUE (email);


--
-- TOC entry 5610 (class 2606 OID 191349)
-- Name: users users_email_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key133 UNIQUE (email);


--
-- TOC entry 5612 (class 2606 OID 191081)
-- Name: users users_email_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key134 UNIQUE (email);


--
-- TOC entry 5614 (class 2606 OID 191351)
-- Name: users users_email_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key135 UNIQUE (email);


--
-- TOC entry 5616 (class 2606 OID 191079)
-- Name: users users_email_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key136 UNIQUE (email);


--
-- TOC entry 5618 (class 2606 OID 191353)
-- Name: users users_email_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key137 UNIQUE (email);


--
-- TOC entry 5620 (class 2606 OID 191077)
-- Name: users users_email_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key138 UNIQUE (email);


--
-- TOC entry 5622 (class 2606 OID 191355)
-- Name: users users_email_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key139 UNIQUE (email);


--
-- TOC entry 5624 (class 2606 OID 191119)
-- Name: users users_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key14 UNIQUE (email);


--
-- TOC entry 5626 (class 2606 OID 191075)
-- Name: users users_email_key140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key140 UNIQUE (email);


--
-- TOC entry 5628 (class 2606 OID 191357)
-- Name: users users_email_key141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key141 UNIQUE (email);


--
-- TOC entry 5630 (class 2606 OID 191359)
-- Name: users users_email_key142; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key142 UNIQUE (email);


--
-- TOC entry 5632 (class 2606 OID 191073)
-- Name: users users_email_key143; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key143 UNIQUE (email);


--
-- TOC entry 5634 (class 2606 OID 191361)
-- Name: users users_email_key144; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key144 UNIQUE (email);


--
-- TOC entry 5636 (class 2606 OID 191071)
-- Name: users users_email_key145; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key145 UNIQUE (email);


--
-- TOC entry 5638 (class 2606 OID 191363)
-- Name: users users_email_key146; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key146 UNIQUE (email);


--
-- TOC entry 5640 (class 2606 OID 191069)
-- Name: users users_email_key147; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key147 UNIQUE (email);


--
-- TOC entry 5642 (class 2606 OID 191365)
-- Name: users users_email_key148; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key148 UNIQUE (email);


--
-- TOC entry 5644 (class 2606 OID 191067)
-- Name: users users_email_key149; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key149 UNIQUE (email);


--
-- TOC entry 5646 (class 2606 OID 191311)
-- Name: users users_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key15 UNIQUE (email);


--
-- TOC entry 5648 (class 2606 OID 191367)
-- Name: users users_email_key150; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key150 UNIQUE (email);


--
-- TOC entry 5650 (class 2606 OID 191065)
-- Name: users users_email_key151; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key151 UNIQUE (email);


--
-- TOC entry 5652 (class 2606 OID 191369)
-- Name: users users_email_key152; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key152 UNIQUE (email);


--
-- TOC entry 5654 (class 2606 OID 191063)
-- Name: users users_email_key153; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key153 UNIQUE (email);


--
-- TOC entry 5656 (class 2606 OID 191371)
-- Name: users users_email_key154; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key154 UNIQUE (email);


--
-- TOC entry 5658 (class 2606 OID 191061)
-- Name: users users_email_key155; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key155 UNIQUE (email);


--
-- TOC entry 5660 (class 2606 OID 191373)
-- Name: users users_email_key156; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key156 UNIQUE (email);


--
-- TOC entry 5662 (class 2606 OID 191375)
-- Name: users users_email_key157; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key157 UNIQUE (email);


--
-- TOC entry 5664 (class 2606 OID 191059)
-- Name: users users_email_key158; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key158 UNIQUE (email);


--
-- TOC entry 5666 (class 2606 OID 191377)
-- Name: users users_email_key159; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key159 UNIQUE (email);


--
-- TOC entry 5668 (class 2606 OID 191121)
-- Name: users users_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key16 UNIQUE (email);


--
-- TOC entry 5670 (class 2606 OID 191057)
-- Name: users users_email_key160; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key160 UNIQUE (email);


--
-- TOC entry 5672 (class 2606 OID 191379)
-- Name: users users_email_key161; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key161 UNIQUE (email);


--
-- TOC entry 5674 (class 2606 OID 191055)
-- Name: users users_email_key162; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key162 UNIQUE (email);


--
-- TOC entry 5676 (class 2606 OID 191381)
-- Name: users users_email_key163; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key163 UNIQUE (email);


--
-- TOC entry 5678 (class 2606 OID 191053)
-- Name: users users_email_key164; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key164 UNIQUE (email);


--
-- TOC entry 5680 (class 2606 OID 191123)
-- Name: users users_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key17 UNIQUE (email);


--
-- TOC entry 5682 (class 2606 OID 191307)
-- Name: users users_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key18 UNIQUE (email);


--
-- TOC entry 5684 (class 2606 OID 191125)
-- Name: users users_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key19 UNIQUE (email);


--
-- TOC entry 5686 (class 2606 OID 191103)
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- TOC entry 5688 (class 2606 OID 191127)
-- Name: users users_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key20 UNIQUE (email);


--
-- TOC entry 5690 (class 2606 OID 191129)
-- Name: users users_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key21 UNIQUE (email);


--
-- TOC entry 5692 (class 2606 OID 191305)
-- Name: users users_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key22 UNIQUE (email);


--
-- TOC entry 5694 (class 2606 OID 191301)
-- Name: users users_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key23 UNIQUE (email);


--
-- TOC entry 5696 (class 2606 OID 191313)
-- Name: users users_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key24 UNIQUE (email);


--
-- TOC entry 5698 (class 2606 OID 191131)
-- Name: users users_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key25 UNIQUE (email);


--
-- TOC entry 5700 (class 2606 OID 191133)
-- Name: users users_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key26 UNIQUE (email);


--
-- TOC entry 5702 (class 2606 OID 191245)
-- Name: users users_email_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key27 UNIQUE (email);


--
-- TOC entry 5704 (class 2606 OID 191309)
-- Name: users users_email_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key28 UNIQUE (email);


--
-- TOC entry 5706 (class 2606 OID 191163)
-- Name: users users_email_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key29 UNIQUE (email);


--
-- TOC entry 5708 (class 2606 OID 191097)
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- TOC entry 5710 (class 2606 OID 191135)
-- Name: users users_email_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key30 UNIQUE (email);


--
-- TOC entry 5712 (class 2606 OID 191137)
-- Name: users users_email_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key31 UNIQUE (email);


--
-- TOC entry 5714 (class 2606 OID 191139)
-- Name: users users_email_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key32 UNIQUE (email);


--
-- TOC entry 5716 (class 2606 OID 191161)
-- Name: users users_email_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key33 UNIQUE (email);


--
-- TOC entry 5718 (class 2606 OID 191303)
-- Name: users users_email_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key34 UNIQUE (email);


--
-- TOC entry 5720 (class 2606 OID 191159)
-- Name: users users_email_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key35 UNIQUE (email);


--
-- TOC entry 5722 (class 2606 OID 191141)
-- Name: users users_email_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key36 UNIQUE (email);


--
-- TOC entry 5724 (class 2606 OID 191157)
-- Name: users users_email_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key37 UNIQUE (email);


--
-- TOC entry 5726 (class 2606 OID 191143)
-- Name: users users_email_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key38 UNIQUE (email);


--
-- TOC entry 5728 (class 2606 OID 191155)
-- Name: users users_email_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key39 UNIQUE (email);


--
-- TOC entry 5730 (class 2606 OID 191105)
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- TOC entry 5732 (class 2606 OID 191145)
-- Name: users users_email_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key40 UNIQUE (email);


--
-- TOC entry 5734 (class 2606 OID 191153)
-- Name: users users_email_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key41 UNIQUE (email);


--
-- TOC entry 5736 (class 2606 OID 191147)
-- Name: users users_email_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key42 UNIQUE (email);


--
-- TOC entry 5738 (class 2606 OID 191151)
-- Name: users users_email_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key43 UNIQUE (email);


--
-- TOC entry 5740 (class 2606 OID 191149)
-- Name: users users_email_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key44 UNIQUE (email);


--
-- TOC entry 5742 (class 2606 OID 191247)
-- Name: users users_email_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key45 UNIQUE (email);


--
-- TOC entry 5744 (class 2606 OID 191299)
-- Name: users users_email_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key46 UNIQUE (email);


--
-- TOC entry 5746 (class 2606 OID 191249)
-- Name: users users_email_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key47 UNIQUE (email);


--
-- TOC entry 5748 (class 2606 OID 191297)
-- Name: users users_email_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key48 UNIQUE (email);


--
-- TOC entry 5750 (class 2606 OID 191251)
-- Name: users users_email_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key49 UNIQUE (email);


--
-- TOC entry 5752 (class 2606 OID 191319)
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- TOC entry 5754 (class 2606 OID 191253)
-- Name: users users_email_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key50 UNIQUE (email);


--
-- TOC entry 5756 (class 2606 OID 191255)
-- Name: users users_email_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key51 UNIQUE (email);


--
-- TOC entry 5758 (class 2606 OID 191295)
-- Name: users users_email_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key52 UNIQUE (email);


--
-- TOC entry 5760 (class 2606 OID 191257)
-- Name: users users_email_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key53 UNIQUE (email);


--
-- TOC entry 5762 (class 2606 OID 191293)
-- Name: users users_email_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key54 UNIQUE (email);


--
-- TOC entry 5764 (class 2606 OID 191259)
-- Name: users users_email_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key55 UNIQUE (email);


--
-- TOC entry 5766 (class 2606 OID 191291)
-- Name: users users_email_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key56 UNIQUE (email);


--
-- TOC entry 5768 (class 2606 OID 191261)
-- Name: users users_email_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key57 UNIQUE (email);


--
-- TOC entry 5770 (class 2606 OID 191289)
-- Name: users users_email_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key58 UNIQUE (email);


--
-- TOC entry 5772 (class 2606 OID 191263)
-- Name: users users_email_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key59 UNIQUE (email);


--
-- TOC entry 5774 (class 2606 OID 191107)
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- TOC entry 5776 (class 2606 OID 191265)
-- Name: users users_email_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key60 UNIQUE (email);


--
-- TOC entry 5778 (class 2606 OID 191267)
-- Name: users users_email_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key61 UNIQUE (email);


--
-- TOC entry 5780 (class 2606 OID 191287)
-- Name: users users_email_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key62 UNIQUE (email);


--
-- TOC entry 5782 (class 2606 OID 191269)
-- Name: users users_email_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key63 UNIQUE (email);


--
-- TOC entry 5784 (class 2606 OID 191285)
-- Name: users users_email_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key64 UNIQUE (email);


--
-- TOC entry 5786 (class 2606 OID 191271)
-- Name: users users_email_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key65 UNIQUE (email);


--
-- TOC entry 5788 (class 2606 OID 191273)
-- Name: users users_email_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key66 UNIQUE (email);


--
-- TOC entry 5790 (class 2606 OID 191283)
-- Name: users users_email_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key67 UNIQUE (email);


--
-- TOC entry 5792 (class 2606 OID 191275)
-- Name: users users_email_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key68 UNIQUE (email);


--
-- TOC entry 5794 (class 2606 OID 191281)
-- Name: users users_email_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key69 UNIQUE (email);


--
-- TOC entry 5796 (class 2606 OID 191109)
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- TOC entry 5798 (class 2606 OID 191277)
-- Name: users users_email_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key70 UNIQUE (email);


--
-- TOC entry 5800 (class 2606 OID 191279)
-- Name: users users_email_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key71 UNIQUE (email);


--
-- TOC entry 5802 (class 2606 OID 191165)
-- Name: users users_email_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key72 UNIQUE (email);


--
-- TOC entry 5804 (class 2606 OID 191167)
-- Name: users users_email_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key73 UNIQUE (email);


--
-- TOC entry 5806 (class 2606 OID 191243)
-- Name: users users_email_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key74 UNIQUE (email);


--
-- TOC entry 5808 (class 2606 OID 191169)
-- Name: users users_email_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key75 UNIQUE (email);


--
-- TOC entry 5810 (class 2606 OID 191171)
-- Name: users users_email_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key76 UNIQUE (email);


--
-- TOC entry 5812 (class 2606 OID 191241)
-- Name: users users_email_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key77 UNIQUE (email);


--
-- TOC entry 5814 (class 2606 OID 191173)
-- Name: users users_email_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key78 UNIQUE (email);


--
-- TOC entry 5816 (class 2606 OID 191239)
-- Name: users users_email_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key79 UNIQUE (email);


--
-- TOC entry 5818 (class 2606 OID 191111)
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- TOC entry 5820 (class 2606 OID 191175)
-- Name: users users_email_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key80 UNIQUE (email);


--
-- TOC entry 5822 (class 2606 OID 191237)
-- Name: users users_email_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key81 UNIQUE (email);


--
-- TOC entry 5824 (class 2606 OID 191177)
-- Name: users users_email_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key82 UNIQUE (email);


--
-- TOC entry 5826 (class 2606 OID 191235)
-- Name: users users_email_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key83 UNIQUE (email);


--
-- TOC entry 5828 (class 2606 OID 191179)
-- Name: users users_email_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key84 UNIQUE (email);


--
-- TOC entry 5830 (class 2606 OID 191181)
-- Name: users users_email_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key85 UNIQUE (email);


--
-- TOC entry 5832 (class 2606 OID 191233)
-- Name: users users_email_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key86 UNIQUE (email);


--
-- TOC entry 5834 (class 2606 OID 191183)
-- Name: users users_email_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key87 UNIQUE (email);


--
-- TOC entry 5836 (class 2606 OID 191231)
-- Name: users users_email_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key88 UNIQUE (email);


--
-- TOC entry 5838 (class 2606 OID 191185)
-- Name: users users_email_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key89 UNIQUE (email);


--
-- TOC entry 5840 (class 2606 OID 191317)
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- TOC entry 5842 (class 2606 OID 191229)
-- Name: users users_email_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key90 UNIQUE (email);


--
-- TOC entry 5844 (class 2606 OID 191187)
-- Name: users users_email_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key91 UNIQUE (email);


--
-- TOC entry 5846 (class 2606 OID 191227)
-- Name: users users_email_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key92 UNIQUE (email);


--
-- TOC entry 5848 (class 2606 OID 191189)
-- Name: users users_email_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key93 UNIQUE (email);


--
-- TOC entry 5850 (class 2606 OID 191225)
-- Name: users users_email_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key94 UNIQUE (email);


--
-- TOC entry 5852 (class 2606 OID 191191)
-- Name: users users_email_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key95 UNIQUE (email);


--
-- TOC entry 5854 (class 2606 OID 191223)
-- Name: users users_email_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key96 UNIQUE (email);


--
-- TOC entry 5856 (class 2606 OID 191193)
-- Name: users users_email_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key97 UNIQUE (email);


--
-- TOC entry 5858 (class 2606 OID 191221)
-- Name: users users_email_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key98 UNIQUE (email);


--
-- TOC entry 5860 (class 2606 OID 191195)
-- Name: users users_email_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key99 UNIQUE (email);


--
-- TOC entry 5862 (class 2606 OID 17240)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 6211 (class 2606 OID 39935)
-- Name: waitlists waitlists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waitlists
    ADD CONSTRAINT waitlists_pkey PRIMARY KEY (id);


--
-- TOC entry 5873 (class 1259 OID 191901)
-- Name: idx_interests_receiver; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interests_receiver ON public.interests USING btree ("receiverId", status);


--
-- TOC entry 5874 (class 1259 OID 191908)
-- Name: idx_interests_receiver_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interests_receiver_status ON public.interests USING btree ("receiverId", status, "createdAt");


--
-- TOC entry 5875 (class 1259 OID 191902)
-- Name: idx_interests_sender; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interests_sender ON public.interests USING btree ("senderId", status);


--
-- TOC entry 5876 (class 1259 OID 191907)
-- Name: idx_interests_sender_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interests_sender_status ON public.interests USING btree ("senderId", status, "createdAt");


--
-- TOC entry 5877 (class 1259 OID 191904)
-- Name: idx_interests_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interests_status ON public.interests USING btree (status);


--
-- TOC entry 5885 (class 1259 OID 17493)
-- Name: idx_messages_conversation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_messages_conversation ON public.messages USING btree ("senderId", "receiverId");


--
-- TOC entry 5880 (class 1259 OID 17442)
-- Name: unique_interest; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_interest ON public.interests USING btree ("senderId", "receiverId");


--
-- TOC entry 5884 (class 1259 OID 17467)
-- Name: unique_match; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_match ON public.matches USING btree ("userId1", "userId2");


--
-- TOC entry 5881 (class 1259 OID 191903)
-- Name: unique_pending_interest; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_pending_interest ON public.interests USING btree ("senderId", "receiverId") WHERE (status = 'PENDING'::public.enum_interests_status);


--
-- TOC entry 6965 (class 2606 OID 191868)
-- Name: badges badges_userProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT "badges_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES public.user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6950 (class 2606 OID 192109)
-- Name: blocks blocks_blockedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES public.users(id);


--
-- TOC entry 6951 (class 2606 OID 192104)
-- Name: blocks blocks_blockerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES public.users(id);


--
-- TOC entry 6918 (class 2606 OID 190071)
-- Name: castes castes_religionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.castes
    ADD CONSTRAINT "castes_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES public.religions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6917 (class 2606 OID 190057)
-- Name: cities cities_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6964 (class 2606 OID 191861)
-- Name: education_career education_career_userProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_career
    ADD CONSTRAINT "education_career_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES public.user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6956 (class 2606 OID 191813)
-- Name: family_details family_details_userProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.family_details
    ADD CONSTRAINT "family_details_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES public.user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6957 (class 2606 OID 191849)
-- Name: horoscope_details horoscope_details_birthCityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_birthCityId_fkey" FOREIGN KEY ("birthCityId") REFERENCES public.cities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6958 (class 2606 OID 191844)
-- Name: horoscope_details horoscope_details_gothramId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_gothramId_fkey" FOREIGN KEY ("gothramId") REFERENCES public.gothrams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6959 (class 2606 OID 191839)
-- Name: horoscope_details horoscope_details_laknamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_laknamId_fkey" FOREIGN KEY ("laknamId") REFERENCES public.laknams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6960 (class 2606 OID 191834)
-- Name: horoscope_details horoscope_details_rasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_rasiId_fkey" FOREIGN KEY ("rasiId") REFERENCES public.rasis(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6961 (class 2606 OID 191829)
-- Name: horoscope_details horoscope_details_starId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_starId_fkey" FOREIGN KEY ("starId") REFERENCES public.stars(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6962 (class 2606 OID 191822)
-- Name: horoscope_details horoscope_details_userProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horoscope_details
    ADD CONSTRAINT "horoscope_details_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES public.user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6920 (class 2606 OID 190399)
-- Name: income_ranges income_ranges_currencyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income_ranges
    ADD CONSTRAINT "income_ranges_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES public.currencies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6940 (class 2606 OID 191894)
-- Name: interests interests_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT "interests_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6941 (class 2606 OID 191889)
-- Name: interests interests_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT "interests_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6963 (class 2606 OID 191854)
-- Name: location_lifestyle location_lifestyle_userProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_lifestyle
    ADD CONSTRAINT "location_lifestyle_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES public.user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6942 (class 2606 OID 191911)
-- Name: matches matches_userId1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6943 (class 2606 OID 191916)
-- Name: matches matches_userId2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6944 (class 2606 OID 191929)
-- Name: messages messages_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6945 (class 2606 OID 191924)
-- Name: messages messages_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6973 (class 2606 OID 191986)
-- Name: notifications notifications_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6974 (class 2606 OID 191981)
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6919 (class 2606 OID 190388)
-- Name: occupations occupations_employmentTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.occupations
    ADD CONSTRAINT "occupations_employmentTypeId_fkey" FOREIGN KEY ("employmentTypeId") REFERENCES public.employment_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6933 (class 2606 OID 19560)
-- Name: partner_preferences partner_preferences_casteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_casteId_fkey" FOREIGN KEY ("casteId") REFERENCES public.castes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6934 (class 2606 OID 19570)
-- Name: partner_preferences partner_preferences_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6935 (class 2606 OID 19565)
-- Name: partner_preferences partner_preferences_educationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES public.educations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6936 (class 2606 OID 19555)
-- Name: partner_preferences partner_preferences_religionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES public.religions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6937 (class 2606 OID 19575)
-- Name: partner_preferences partner_preferences_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6938 (class 2606 OID 19546)
-- Name: partner_preferences partner_preferences_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_preferences
    ADD CONSTRAINT "partner_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6948 (class 2606 OID 191962)
-- Name: payments payments_subscriptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES public.subscriptions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6949 (class 2606 OID 191957)
-- Name: payments payments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6977 (class 2606 OID 192016)
-- Name: phone_view_logs phone_view_logs_viewedUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone_view_logs
    ADD CONSTRAINT "phone_view_logs_viewedUserId_fkey" FOREIGN KEY ("viewedUserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6978 (class 2606 OID 192010)
-- Name: phone_view_logs phone_view_logs_viewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone_view_logs
    ADD CONSTRAINT "phone_view_logs_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6975 (class 2606 OID 192002)
-- Name: profile_views profile_views_viewedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_views
    ADD CONSTRAINT "profile_views_viewedId_fkey" FOREIGN KEY ("viewedId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6976 (class 2606 OID 191997)
-- Name: profile_views profile_views_viewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_views
    ADD CONSTRAINT "profile_views_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6952 (class 2606 OID 192121)
-- Name: reports reports_reportedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT "reports_reportedId_fkey" FOREIGN KEY ("reportedId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6953 (class 2606 OID 192116)
-- Name: reports reports_reporterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT "reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6916 (class 2606 OID 190049)
-- Name: states states_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6946 (class 2606 OID 191948)
-- Name: subscriptions subscriptions_planId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES public.plans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6947 (class 2606 OID 191943)
-- Name: subscriptions subscriptions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6954 (class 2606 OID 192129)
-- Name: success_stories success_stories_partner1Id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT "success_stories_partner1Id_fkey" FOREIGN KEY ("partner1Id") REFERENCES public.users(id);


--
-- TOC entry 6955 (class 2606 OID 192134)
-- Name: success_stories success_stories_partner2Id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT "success_stories_partner2Id_fkey" FOREIGN KEY ("partner2Id") REFERENCES public.users(id);


--
-- TOC entry 6939 (class 2606 OID 191504)
-- Name: user_photos user_photos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_photos
    ADD CONSTRAINT "user_photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6966 (class 2606 OID 191482)
-- Name: user_preferences user_preferences_casteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_casteId_fkey" FOREIGN KEY ("casteId") REFERENCES public.castes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6967 (class 2606 OID 191492)
-- Name: user_preferences user_preferences_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6968 (class 2606 OID 191487)
-- Name: user_preferences user_preferences_educationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES public.educations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6969 (class 2606 OID 191477)
-- Name: user_preferences user_preferences_religionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES public.religions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6970 (class 2606 OID 191497)
-- Name: user_preferences user_preferences_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6971 (class 2606 OID 191468)
-- Name: user_preferences user_preferences_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6921 (class 2606 OID 191413)
-- Name: user_profiles user_profiles_casteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_casteId_fkey" FOREIGN KEY ("casteId") REFERENCES public.castes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6922 (class 2606 OID 191432)
-- Name: user_profiles user_profiles_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public.cities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6923 (class 2606 OID 191422)
-- Name: user_profiles user_profiles_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6924 (class 2606 OID 191437)
-- Name: user_profiles user_profiles_educationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES public.educations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6925 (class 2606 OID 191442)
-- Name: user_profiles user_profiles_employmentTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_employmentTypeId_fkey" FOREIGN KEY ("employmentTypeId") REFERENCES public.employment_types(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6926 (class 2606 OID 191457)
-- Name: user_profiles user_profiles_incomeCurrencyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_incomeCurrencyId_fkey" FOREIGN KEY ("incomeCurrencyId") REFERENCES public.currencies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6927 (class 2606 OID 191452)
-- Name: user_profiles user_profiles_incomeRangeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_incomeRangeId_fkey" FOREIGN KEY ("incomeRangeId") REFERENCES public.income_ranges(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6928 (class 2606 OID 191403)
-- Name: user_profiles user_profiles_motherTongueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_motherTongueId_fkey" FOREIGN KEY ("motherTongueId") REFERENCES public.mother_tongues(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6929 (class 2606 OID 191447)
-- Name: user_profiles user_profiles_occupationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES public.occupations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6930 (class 2606 OID 191408)
-- Name: user_profiles user_profiles_religionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES public.religions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6931 (class 2606 OID 191427)
-- Name: user_profiles user_profiles_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 6932 (class 2606 OID 191390)
-- Name: user_profiles user_profiles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 6972 (class 2606 OID 191973)
-- Name: waitlists waitlists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waitlists
    ADD CONSTRAINT "waitlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-05-30 23:32:19

--
-- PostgreSQL database dump complete
--

\unrestrict wPDc54N6kQllXFkBSduzePMPHb75W8Uk36ahefoVwmqzeYXg4MczPYUvSt6MVlT

