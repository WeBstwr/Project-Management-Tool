import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useAuth from '../../hooks/useAuth';
import './profile.css';

// Validation function for profile updates
const validateProfile = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

// Validation function for password change
const validatePassword = (values) => {
    const errors = {};

    if (!values.currentPassword) {
        errors.currentPassword = 'Current password is required';
    }

    if (!values.newPassword) {
        errors.newPassword = 'New password is required';
    } else if (values.newPassword.length < 6) {
        errors.newPassword = 'Password must be at least 6 characters';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.newPassword !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return errors;
};

function Profile() {
    const { user, logout, updateProfile, changePassword } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [profileMessage, setProfileMessage] = useState('');
    const [profileError, setProfileError] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleProfileUpdate = (values, { setSubmitting, resetForm }) => {
        setProfileMessage('');
        setProfileError('');
        const ok = updateProfile({ name: values.name.trim(), email: values.email.trim() });
        setSubmitting(false);
        if (ok) {
            setProfileMessage('Profile updated successfully!');
            resetForm({ values });
            setTimeout(() => setProfileMessage(''), 3000);
        } else {
            setProfileError('Could not update profile (email may already exist).');
        }
    };

    const handlePasswordChange = (values, { setSubmitting, resetForm }) => {
        setPasswordMessage('');
        setPasswordError('');
        const ok = changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
        setSubmitting(false);
        if (ok) {
            setPasswordMessage('Password changed successfully!');
            resetForm();
            setTimeout(() => setPasswordMessage(''), 3000);
        } else {
            setPasswordError('Current password is incorrect.');
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1 className="profile-title">Profile Settings</h1>
                <p className="profile-subtitle">
                    Manage your account information and preferences
                </p>
            </div>

            <div className="profile-container">
                {/* Tab Navigation */}
                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Information
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        Change Password
                    </button>
                </div>

                {/* Profile Information Tab */}
                {activeTab === 'profile' && (
                    <div className="profile-section">
                        <h2>Profile Information</h2>
                        <Formik
                            initialValues={{
                                name: user?.name || '',
                                email: user?.email || '',
                            }}
                            validate={validateProfile}
                            onSubmit={handleProfileUpdate}
                        >
                            {({ isSubmitting }) => (
                                <Form className="profile-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input"
                                            placeholder="Enter your full name"
                                        />
                                        <ErrorMessage name="name" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="Enter your email address"
                                        />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>

                                    {profileError && (<div className="error-message">{profileError}</div>)}
                                    {profileMessage && (
                                        <div className="success-message">{profileMessage}</div>
                                    )}

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

                {/* Change Password Tab */}
                {activeTab === 'password' && (
                    <div className="profile-section">
                        <h2>Change Password</h2>
                        <Formik
                            initialValues={{
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: '',
                            }}
                            validate={validatePassword}
                            onSubmit={handlePasswordChange}
                        >
                            {({ isSubmitting }) => (
                                <Form className="profile-form">
                                    <div className="form-group">
                                        <label htmlFor="currentPassword">Current Password</label>
                                        <Field
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            className="form-input"
                                            placeholder="Enter your current password"
                                        />
                                        <ErrorMessage name="currentPassword" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <Field
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            className="form-input"
                                            placeholder="Enter your new password"
                                        />
                                        <ErrorMessage name="newPassword" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm New Password</label>
                                        <Field
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="form-input"
                                            placeholder="Confirm your new password"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                    </div>

                                    {passwordError && (<div className="error-message">{passwordError}</div>)}
                                    {passwordMessage && (
                                        <div className="success-message">{passwordMessage}</div>
                                    )}

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Changing Password...' : 'Change Password'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

                {/* Account Actions */}
                <div className="account-actions">
                    <h3>Account Actions</h3>
                    <div className="action-buttons">
                        <button className="action-btn danger" onClick={logout}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile; 