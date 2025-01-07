import Layout from './LayoutComponent'; // Adjust to correct file path
import Template from './TemplateComponent'; // Adjust to correct file path
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>