from PIL import Image, ImageEnhance, ImageFilter

# Load the image
image_path = "./background_montain.jpg"
image = Image.open(image_path)

# Enhance the image by depixellating (using smooth filter) and brightening
# Applying a filter to smooth out the pixels
image_smooth = image.filter(ImageFilter.SHARPEN)

# Save the enhanced image
output_path = "./smooth_background_mountain.jpg"
image_smooth.save(output_path)

output_path
