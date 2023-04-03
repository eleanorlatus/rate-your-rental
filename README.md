
# Rate your rental

<img width="1280" alt="Screenshot 2023-02-11 at 17 58 42" src="https://user-images.githubusercontent.com/90465357/218273516-36ebff97-154d-43e2-80f2-65cd95ee1795.png">

Rate your rental is a social media platform that allows renters in the UK to rate their rental property and landlords. Our aim is to help people make informed decisions and elevate their rental experience. The site is responsive so works on both desktop and mobile.

You can view the demo here: <a href="https://rateyourrental.cyclic.app">https://rateyourrental.cyclic.app</a>

## Getting started

### Installation

```bash
npm install
```

### Things to add
- Create a `.env` file in config folder and add the following as `key = value`
```bash
PORT = 2121
DB_STRING = `your database URI`
CLOUD_NAME = `your cloudinary cloud name`
API_KEY = `your cloudinary api key`
API_SECRET = `your cloudinary api secret`
```

## Running the application
```bash
npm run build-css
npm run dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Optimisations

For optimisations, I want to focus on adding categories and star ratings to the review form to allow users to rate their property in different areas and give it an average score out of 10. I would also add the ability to upload more than one image per review and refine the search bar.

Additional optimisations would focus on the UX, including the addition of dark mode.

## License

[MIT](https://choosealicense.com/licenses/mit/)
