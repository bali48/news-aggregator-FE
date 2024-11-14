import React, { useState, useEffect } from "react";
import Select from "react-select";
import { post, get } from "../services/axiosService"; // Assuming you have services for API calls
import { apiEndPoints } from "../Constants/urls"; // Define your API endpoints here
import { FaUserCircle } from "react-icons/fa";
import Spinner from "./Spinner";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      fetchPreferences();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const fetchPreferences = async () => {
    try {
      const response = await get(apiEndPoints.CategoriesAndAuthors);
      setSources(response.sources);
      setCategories(response.categories);
      setAuthors(response.authors);
      const preferencesResponse = await get(apiEndPoints.USERPREFRENCES);

      setUserInfo({
        username: preferencesResponse.user?.name,
        email: preferencesResponse.user.email,
      });
      setSelectedCategories(
        response.categories.find(
          (item) => item.name === preferencesResponse.preferences.categories
        )
      );
      setSelectedAuthors(
        response.authors.find(
          (item) => item.name === preferencesResponse.preferences.authors
        )
      );
      setSelectedSources(
        response.sources.find(
          (item) => item.name === preferencesResponse.preferences.sources
        )
      );
      setLoading(false);
    } catch (error) {
      setError("Failed to load preferences.");
    }
  };
  const handleSourceChange = (selectedOptions) => {
    setSelectedSources(selectedOptions || []);
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleAuthorChange = (selectedOptions) => {
    setSelectedAuthors(selectedOptions || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const preferences = {
        sources: selectedSources.name,
        categories: selectedCategories.name,
        authors: selectedAuthors.name,
      };

      // Save preferences via API call
      const response = await post(apiEndPoints.USERPREFRENCES, preferences); // Save preferences API endpoint
      setSuccess("Preferences saved successfully!");
      setError("");
    } catch (error) {
      setError("Failed to save preferences.");
      setSuccess("");
    }
  };

  return (
    <div className='container mt-5'>
      {loading ? (
        <Spinner />
      ) : (
        <div className='d-flex justify-content-center'>
          <div className='card' style={{ width: "100%", maxWidth: "600px" }}>
            <div className='card-body'>
              <div className='text-center'>
                {userInfo?.username ? (
                  <div className='mb-4'>
                    <FaUserCircle size={40} />
                    <h5>{userInfo.username}</h5>
                    <h5>{userInfo.email}</h5>
                  </div>
                ) : (
                  <h4>Please log in to view your profile</h4>
                )}
              </div>

              {error && <p className='text-danger'>{error}</p>}
              {success && <p className='text-success'>{success}</p>}

              <h4>Personalize Your News Feed</h4>

              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='sources' className='form-label'>
                    Preferred Sources
                  </label>
                  <Select
                    id='sources'
                    getOptionLabel={(opt) => opt.name}
                    getOptionValue={(opt) => opt.id}
                    options={sources}
                    value={selectedSources}
                    onChange={handleSourceChange}
                    className='react-select-container'
                  />
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor='categories' className='form-label'>
                        Preferred Categories
                      </label>
                      <Select
                        id='categories'
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                        options={categories}
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        className='react-select-container'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor='authors' className='form-label'>
                        Preferred Authors
                      </label>
                      <Select
                        id='authors'
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                        options={authors}
                        value={selectedAuthors}
                        onChange={handleAuthorChange}
                        className='react-select-container'
                      />
                    </div>
                  </div>
                </div>

                <button type='submit' className='btn btn-primary w-100'>
                  Save Preferences
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
