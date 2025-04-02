import { useEffect, useState } from 'react';
import './CategoryFilter.css';

//void = pass nothing
// these selectedCategories and setSelectedCategories are different from that in const [selectedCategories, setSelectedCategories] = useState<string[]>([]); in App.tsx
// CategoryFilter component for filtering books by category
// Props:
// - selectedCategories: An array of selected category names
// - setSelectedCategories: A function to update the selected categories
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categorires: string[]) => void;
}) {
  // State to hold the list of categories fetched from the backend
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch book categories from the backend API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:5288/Book/GetCategories' // API endpoint to get categories
        );
        const data = await response.json(); // Parse response JSON
        console.log('Fetched categories:', data); // Log fetched categories
        setCategories(data); // Update state with fetched categories
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle checkbox selection for categories
  // thing that I want to pass in as an object that contains an integer and the type of the thing
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // Check if the clicked category is already selected
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value) // Remove if already selected
      : [...selectedCategories, target.value]; // Add if not selected
    // check if already selected categories including inputed selected categories names (value = {c}) (check and see if it already includes the target).
    // AND if it is true, going to the selected categories and filtering/removing categories that are not the same value and type.
    // If it is false, add target values to the selected categories

    //if I named the setSelectedCategories differently above, then I need to change this to the name I asigned
    //udating the state valiable (each checkbox has this)
    setSelectedCategories(updatedCategories); // Update the selected categories state
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="category-filter">
        <h5>Book Categories</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange} // Handle selection change
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
